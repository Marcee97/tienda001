require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { MercadoPagoConfig, PreApproval } = require('mercadopago');
const client = new MercadoPagoConfig({ accessToken: process.env.TOKEN_MERCADOPAGO });

const crearSuscripcion = async (req, res) => {
  const { productoId, datosFormulario } = req.body; 
  try {
    const preapproval = new PreApproval(client);

    const suscripcion = await preapproval.create({
      body: {
        payer_email: datosFormulario.email,
        reason: "Art3mia suscripción",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 500, 
          currency_id: "ARS",
        },
        back_url: "https://ecomercce-back.onrender.com/api/success",
      },
    });

    console.log("=== SUSCRIPCIÓN CREADA ===");
    console.log("preapproval_id:", suscripcion.id);
    console.log("init_point:", suscripcion.init_point);

    res.status(201).json({ init_point: suscripcion.init_point });
  } catch (error) {
    console.error("Error creando suscripción", error);
    res.status(500).json({ error: "Error al crear suscripción" });
  }
};
module.exports = {crearSuscripcion}