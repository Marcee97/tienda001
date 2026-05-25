require("dotenv").config();

console.log(process.env.TOKEN_MERCADOPAGO)
const { MercadoPagoConfig, Preference } = require('mercadopago');
const client = new MercadoPagoConfig({ accessToken: process.env.TOKEN_MERCADOPAGO });


const crearPreferencia = async (req, res) => {
  console.log(req.body, "este es el body")

  const {carrito, datosFormulario} = req.body
  try{
    console.log("DATA EN BACK", req.body)
    
    
    
    const preference = new Preference(client);
    
    const response = await preference.create({
       body: {
        items: carrito.map((item) => ({
          title: item.nombre,
          quantity: item.cantidad,
          unit_price: Number(item.precio),
        })),
        metadata:{
          carrito,datosFormulario
        },
        back_urls: {
          success: "https://64f3-181-165-192-32.ngrok-free.app/success",
          failure: "https://64f3-181-165-192-32.ngrok-free.app/failed",
          pending: "https://64f3-181-165-192-32.ngrok-free.app/pending"
        },
         auto_return: "approved",
         notification_url: "https://9f71-181-165-192-32.ngrok-free.app/api/webhook"
      }
    })
    console.log("RESPUESTA MP COMPLETA:", JSON.stringify(response, null, 2))
   res.json({ id: response.id, init_point: response.init_point })
    
  }catch(error) {
    console.error("Error creando preferencia", error);
    res.status(500).json({
      error: "Error al crear preferencia", error
    })
  }
}

module.exports = {crearPreferencia}
