const express = require("express");

const router = express.Router();

const { venta } = require("../controllers/ventas.js");
const { actualizarStock } = require("../controllers/postventa/actualizarStock.js");
const {datosDeVenta} = require("../controllers/postventa/datosDeVenta.js")  
router.get("/", venta);
router.post("/", actualizarStock);
router.post("/", datosDeVenta);

module.exports = router;