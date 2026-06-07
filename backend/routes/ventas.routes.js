const express = require("express");

const router = express.Router();

const { actualizarStock } = require("../controllers/postventa/actualizarStock.js");
const {datosDeVenta} = require("../controllers/postventa/datosDeVenta.js")  
router.post("/", actualizarStock);
router.post("/", datosDeVenta);

module.exports = router;