const express = require("express");

const router = express.Router();

const { venta } = require("../controllers/ventas.js");

router.get("/", venta);

module.exports = router;