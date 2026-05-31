require("dotenv").config();
const {pool} = require ("../database/db.config.js")
console.log(process.env.TOKEN_MERCADOPAGO)
const { MercadoPagoConfig, Preference } = require('mercadopago');
const client = new MercadoPagoConfig({ accessToken: process.env.TOKEN_MERCADOPAGO });


const crearPreferencia = async (req, res) => {
  console.log(req.body, "este es el body")

  const {carrito, datosFormulario} = req.body
  try{
    console.log("DATA EN BACK", req.body)
    
    const ids = carrito.map((item) => item.id);
    const [productos] = await pool.query(
      `SELECT id, precio FROM productos WHERE id IN (?)`, [ids]
    )
    
const carritoSeguro = carrito.map((item) => {
  const productoReal = productos.find((p) => p.id === item.id);
  return {
    ... item,
    precio: productoReal.precio
  }
})
console.log("productos DB", productos);
console.log("Carruto seguor", carritoSeguro)
    const preference = new Preference(client);
    
    const response = await preference.create({
       body: {
        items: carritoSeguro.map((item) => ({
          title: item.nombre,
          quantity: item.cantidad,
          unit_price: Number(item.precio),
        })),
        metadata:{
          carritoSeguro,datosFormulario
        },
        back_urls: {
          success: "https://64f3-181-165-192-32.ngrok-free.app/success",
          failure: "https://64f3-181-165-192-32.ngrok-free.app/failed",
          pending: "https://64f3-181-165-192-32.ngrok-free.app/pending"
        },
         auto_return: "approved",
         notification_url: "https://054f-181-165-192-32.ngrok-free.app/api/webhook"
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
