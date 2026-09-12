const {
  MercadoPagoConfig,
  Payment,
  PreApproval,
  PaymentRefund,
} = require("mercadopago");
const { pool } = require("../../database/db.config");
//test_user_1898662543850859181@testuser.com
const client = new MercadoPagoConfig({
  accessToken: process.env.TOKEN_MERCADOPAGO,
});
const preapprovalClient = new PreApproval(client);

const webhookSuscripciones = async (req, res) => {
  const { type, data } = req.body;

  console.log("=== WEBHOOK SUSCRIPCIONES RECIBIDO ===");
  console.log(JSON.stringify(req.body, null, 2));

  const procesarReembolso = async (suscripcionId) => {
    const { rows } = await pool.query(
      `SELECT pagos_realizados FROM suscripciones WHERE id = $1`,
      [suscripcionId],
    );

    if (rows.length === 0) return;

    const pagosADevolver = rows[0].pagos_realizados % 3;

    if (pagosADevolver === 0) {
      console.log(
        `ℹ️ Suscripción ${suscripcionId} cancelada, no hay pagos pendientes de devolución`,
      );
      return;
    }

    const { rows: pagos } = await pool.query(
      `SELECT * FROM pagos_suscripcion
     WHERE suscripcion_id = $1 AND reembolsado = false
     ORDER BY fecha DESC
     LIMIT $2`,
      [suscripcionId, pagosADevolver],
    );

    const refundClient = new PaymentRefund(client);

    for (const pago of pagos) {
      try {
        await refundClient.create({ payment_id: pago.mp_payment_id });
        await pool.query(
          `UPDATE pagos_suscripcion SET reembolsado = true WHERE id = $1`,
          [pago.id],
        );
        console.log(`💸 Pago ${pago.mp_payment_id} reembolsado`);
      } catch (error) {
        console.error(
          `❌ Error reembolsando pago ${pago.mp_payment_id}:`,
          error,
        );
      }
    }
  };

  try {
    if (!type || !data?.id) {
      console.log("⚠️ Notificación sin type o data.id, ignorando");
      return res.sendStatus(200);
    }

    //-------------------ALTA / CAMBIO DE ESTADO DE SUSCRIPCIÓN-------------------
    if (type === "subscription_preapproval") {
      const preapproval = await preapprovalClient.get({ id: data.id });
      const externalReference = preapproval.external_reference;

      console.log(
        ">>> external_reference:",
        externalReference,
        "status:",
        preapproval.status,
      );

      if (!externalReference) {
        console.log("⚠️ La suscripción no tiene external_reference");
        return res.sendStatus(200);
      }

      const existe = await pool.query(
        `SELECT id FROM suscripciones WHERE external_reference = $1`,
        [externalReference],
      );

      if (existe.rows.length === 0) {
        console.log(
          `⚠️ No se encontró suscripción con external_reference ${externalReference}`,
        );
        return res.sendStatus(200);
      }
      const suscripcionId = existe.rows[0].id;
      const nuevoEstado =
        preapproval.status === "authorized" ? "activo" : preapproval.status;

      await pool.query(
        `UPDATE suscripciones SET preapproval_id = $1, estado = $2 WHERE id = $3`,
        [preapproval.id, nuevoEstado, existe.rows[0].id],
      );

      console.log(
        `✅ Suscripción ${existe.rows[0].id} actualizada a estado: ${nuevoEstado}`,
      );
      if (preapproval.status === "cancelled") {
        await procesarReembolso(suscripcionId);
      }
    }

    //-------------------PAGO RECURRENTE COBRADO-------------------
    if (type === "subscription_authorized_payment") {
      const paymentId = data.id;
      const payment = new Payment(client);
      const pagoInfo = await payment.get({ id: paymentId });
      const preapprovalId =
        pagoInfo.point_of_interaction?.transaction_data?.subscription_id;

      console.log(">>> pago recurrente cobrado, preapprovalId:", preapprovalId);

      if (!preapprovalId) {
        console.log("⚠️ No se pudo obtener el preapproval_id del pago");
        return res.sendStatus(200);
      }

      const existe = await pool.query(
        `SELECT id, pagos_realizados FROM suscripciones WHERE preapproval_id = $1`,
        [preapprovalId],
      );

      if (existe.rows.length === 0) {
        console.log(
          `⚠️ No se encontró suscripción con preapproval_id ${preapprovalId}`,
        );
        return res.sendStatus(200);
      }

      const suscripcionDb = existe.rows[0];
      const nuevosPagos = suscripcionDb.pagos_realizados + 1;

      await pool.query(
        `UPDATE suscripciones SET pagos_realizados = $1 WHERE id = $2`,
        [nuevosPagos, suscripcionDb.id],
      );

      //Dovelucion
      await pool.query(
        `INSERT INTO pagos_suscripcion (suscripcion_id, mp_payment_id, monto)
         VALUES ($1, $2, $3)
         ON CONFLICT (mp_payment_id) DO NOTHING`,
        [suscripcionDb.id, String(paymentId), pagoInfo.transaction_amount],
      );
      console.log(
        `✅ Pago registrado. Suscripción ${suscripcionDb.id} ahora tiene ${nuevosPagos} pagos`,
      );

      if (nuevosPagos % 3 === 0) {
        await pool.query(
          `INSERT INTO envios_suscripcion (suscripcion_id, numero_envio, estado)
           VALUES ($1, $2, 'pendiente')`,
          [suscripcionDb.id, nuevosPagos / 3],
        );
        console.log(
          `📦 Envío #${nuevosPagos / 3} generado para la suscripción ${suscripcionDb.id}`,
        );
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error en webhook de suscripciones:", error);
    res.sendStatus(500);
  }
};

module.exports = { webhookSuscripciones };
