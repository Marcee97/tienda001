require("dotenv").config();

console.log(process.env.TOKEN_MERCADOPAGO)
const { MercadoPagoConfig, Preference } = require('mercadopago');
const client = new MercadoPagoConfig({ accessToken: process.env.TOKEN_MERCADOPAGO });


const crearPreferencia = async (req, res) => {
  console.log(req.body, "este es el body")

  const {carrito} = req.body
  try{
    console.log("DATA EN BACK", req.body)
    
    const {nombre, precio, cantidad} = req.body
    
    if(!nombre || !precio) {
      return res.status(400).json({
        error: "Faltan datos: nombre y predio son obligatorios"
      })
    }
    const preference = new Preference(client);
    
    const response = await preference.create({
      body: {
        items: [
          {
            title: nombre,
            quantity: 1,
            unit_price:  Number(precio)
          }
        ],
        back_urls: {
          success: "https://e487-181-165-184-241.ngrok-free.app/success",
          failure: "http://localhost:5173/failed",
          pending: "http://localhost:5173/pending"
        },
         auto_return: "approved",
         notification_url: "https://bc13-181-165-184-241.ngrok-free.app/api/webhook"
      }
    })
    res.json({
      id: response.id
    })
   
  }catch(error) {
    console.error("Error creando preferencia", error);
    res.status(500).json({
      error: "Error al crear preferencia", error
    })
  }
}

module.exports = {crearPreferencia}
