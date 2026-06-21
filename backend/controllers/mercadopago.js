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
    const { rows: productos } = await pool.query(
      `SELECT id, precio FROM productos WHERE id = ANY($1)`, [ids]
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
          success: "https://tienda001-892w.vercel.app/success",
          failure: "https://tienda001-892w.vercel.app/failed",
          pending: "https://tienda001-892w.vercel.app/pending"
        },
         auto_return: "approved",
         notification_url: "https://ecomercce-back.onrender.com/api/webhook"
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
