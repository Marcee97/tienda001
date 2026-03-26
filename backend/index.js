
const express = require("express");
const cors = require('cors')
const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

const mercadoPagoRoutes = require('./routes/mercadopago.routes.js')
const webhookRoutes = require('./routes/webhook.routes.js')
app.use('/api/pagos', mercadoPagoRoutes)

app.use('/api/webhook', webhookRoutes)

app.get("/", (req, res) => {
  res.send("Servidor funcionando con CommonJS");
});
console.log(process.env.TOKEN_MERCADOPAGO)
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});