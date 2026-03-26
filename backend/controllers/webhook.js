
const { MercadoPagoConfig, Payment } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.TOKEN_MERCADOPAGO
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
        amount: payment.transaction_amount
      });

      if (payment.status === "approved") {
        console.log("✅ PAGO APROBADO");

        // 👉 TODO:
        // - guardar en DB
        // - evitar duplicados
      }
    }

    res.sendStatus(200);

  } catch (error) {
    console.error("❌ Error en webhook:", error);
    res.sendStatus(500);
  }
};

module.exports = { webhook };