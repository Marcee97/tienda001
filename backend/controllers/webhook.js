const { MercadoPagoConfig, Payment } = require("mercadopago");
const { pool } = require("../database/db.config.js");
const { enviarEmailCompra } = require("./email/emailService.js");

const client = new MercadoPagoConfig({
  accessToken: process.env.TOKEN_MERCADOPAGO,
});

const paymentClient = new Payment(client);

const webhook = async (req, res) => {
  try {
    console.log("🔔 WEBHOOK RECIBIDO");
    console.log("BODY:", req.body);

    if (req.body.type === "payment" && req.body.data?.id) {
      const paymentId = req.body.data.id;
      console.log("💰 Pago detectado:", paymentId);

      const payment = await paymentClient.get({ id: paymentId });

      console.log("📊 PAYMENT:", {
        id: payment.id,
        status: payment.status,
        amount: payment.transaction_amount,
      });
//-------------------PAGO APROBADO-------------------------------------------------------
      if (payment.status === "approved") {
        console.log("✅ PAGO APROBADO");
        console.log("METADATA:", JSON.stringify(payment.metadata, null, 2));

        // 1. Evitar duplicados
        const existe = await pool.query(
          `SELECT id FROM ventas WHERE mp_payment_id = $1`,
          [String(payment.id)]
        );

        if (existe.rows.length > 0) {
          console.log("⚠️ Pago ya procesado, ignorando");
          return res.sendStatus(200);
        }

        const { carrito_seguro, datos_formulario } = payment.metadata;

        // 2. Guardar venta y obtener el id generado
        const venta = await pool.query(
          `INSERT INTO ventas (nombre, email, telefono, calle, numero, ciudad, provincia, codigo_postal, total, estado, mp_payment_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'aprobado', $10)
           RETURNING id`,
          [
            datos_formulario.nombre,
            datos_formulario.email,
            datos_formulario.telefono,
            datos_formulario.calle,
            datos_formulario.numero,
            datos_formulario.ciudad,
            datos_formulario.provincia,
            datos_formulario.codigo_postal,
            payment.transaction_amount,
            String(payment.id),
          ]
        );
        await enviarEmailCompra({
          email:datos_formulario.email,
          nombre:datos_formulario.nombre,
          carrito:carrito_seguro,
          total:payment.transaction_amount
        })

        const ventaId = venta.rows[0].id;

        // 3. Guardar items
        await Promise.all(
          carrito_seguro.map((item) =>
            pool.query(
              `INSERT INTO venta_items (venta_id, producto_id, color_id, talle, cantidad, precio_unitario)
               VALUES ($1, $2, $3, $4, $5, $6)`,
              [ventaId, item.id, item.color, item.talle, item.cantidad, item.precio]
            )
          )
        );

        // 4. Actualizar stock
        await Promise.all(
          carrito_seguro.map((item) =>
            pool.query(
              `UPDATE variantes SET stock = stock - $1
               WHERE producto_id = $2 AND color_id = $3 AND talle = $4 AND stock >= $1`,
              [item.cantidad, item.id, item.color, item.talle]
            )
          )
        );

        console.log("✅ Venta guardada y stock actualizado");
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error en webhook:", error);
    res.sendStatus(500);
  }
};

module.exports = { webhook };