const { MercadoPagoConfig, Payment } = require('mercadopago');
const client = new MercadoPagoConfig({ accessToken: process.env.TOKEN_MERCADOPAGO });

const webhookSuscripciones = async (req, res) => {
  const { type, data } = req.body;

  console.log("=== WEBHOOK SUSCRIPCIONES RECIBIDO ===");
  console.log("type:", type);
  console.log("data:", data);
  console.log("body completo:", req.body);
  try {
    if (type === "subscription_preapproval") {
      console.log(">>> Evento: cambio de estado de suscripción, id:", data.id);
    }

    if (type === "subscription_authorized_payment") {
      const paymentId = data.id;
      const payment = new Payment(client);
      const pagoInfo = await payment.get({ id: paymentId });
      const preapprovalId = pagoInfo.point_of_interaction?.transaction_data?.subscription_id;
      console.log(">>> Evento: pago recurrente cobrado, preapprovalId:", preapprovalId);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error en webhook de suscripciones", error);
    res.sendStatus(500);
  }
};

module.exports = { webhookSuscripciones };