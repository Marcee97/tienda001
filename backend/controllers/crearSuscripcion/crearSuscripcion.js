require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { MercadoPagoConfig, PreApproval } = require('mercadopago');
const { pool } = require('../../database/db.config');
const client = new MercadoPagoConfig({ accessToken: process.env.TOKEN_MERCADOPAGO });

const crearSuscripcion = async (req, res) => {
  const { producto, datosFormulario } = req.body; 
  try {

     const nuevaSuscripcion = await pool.query(
      `INSERT INTO suscripciones
        (nombre, email, telefono, calle, numero, ciudad, provincia, codigo_postal, producto_id, color_id, talle, estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pendiente')
       RETURNING id`,
      [
        datosFormulario.nombre,
        datosFormulario.email,
        datosFormulario.telefono,
        datosFormulario.calle,
        datosFormulario.numero,
        datosFormulario.ciudad,
        datosFormulario.provincia,
        datosFormulario.codigoPostal,
        producto.id,
        producto.color,
        producto.talle,
      ]
    );

    const suscripcionId = nuevaSuscripcion.rows[0].id;
    const externalReference = `SUB-${suscripcionId}`;

    // 2. Guardar el external_reference en la misma fila
    await pool.query(
      `UPDATE suscripciones SET external_reference = $1 WHERE id = $2`,
      [externalReference, suscripcionId]
    );

    const preapproval = new PreApproval(client);

    const suscripcion = await preapproval.create({
      body: {
        payer_email: datosFormulario.email,
        reason: "Art3mia suscripción",
        external_reference: externalReference,
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 500, 
          currency_id: "ARS",
        },
        back_url: "https://ecomercce-back.onrender.com/api/success",
        metadata:{
          producto,
          datosFormulario: datosFormulario
        }
      },
    });

    console.log("=== SUSCRIPCIÓN CREADA ===");
     console.log("external_reference:", externalReference);
    console.log("preapproval_id:", suscripcion.id);
    console.log("init_point:", suscripcion.init_point);

    res.status(201).json({ init_point: suscripcion.init_point });
  } catch (error) {
    console.error("Error creando suscripción", error);
    res.status(500).json({ error: "Error al crear suscripción" });
  }
};
module.exports = {crearSuscripcion}