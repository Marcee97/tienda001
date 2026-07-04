const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tienda001-892w.vercel.app",
        "http://100.119.98.86:5173"  //← la URL de de TailsCale
    ],
  }),
);
app.use(express.json());

const mercadoPagoRoutes = require("./routes/mercadopago.routes.js");
const webhookRoutes = require("./routes/webhook.routes.js");
const productosRoutes = require("./routes/productos.routes.js");
const variantesRoutes = require("./routes/variantes.routes.js");
const actualizarStock = require("./routes/ventas.routes.js");
const datosDeVenta = require("./routes/ventas.routes.js");
const chatbotRoutes = require("./routes/chatbot.routes.js");

app.use("/api/variantes", variantesRoutes);
app.use("/api/crear-preferencia", mercadoPagoRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/actualizar-stock", actualizarStock);
app.use("/api/datos-venta", datosDeVenta);
app.use("/api/chatbot", chatbotRoutes);
app.get("/", (req, res) => {
  res.send("Servidor funcionando con CommonJS");
});
console.log(process.env.TOKEN_MERCADOPAGO);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
