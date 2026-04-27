const express = require("express");
const {getProductos} = require("../controllers/productos.js")

const router = express.Router();
router.get("/", getProductos);

module.exports = router;