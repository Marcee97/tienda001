const express = require("express");

const router = express.Router();

const { crearPreferencia } = require("../controllers/mercadopago.js");

router.post("/", crearPreferencia);

module.exports = router;
