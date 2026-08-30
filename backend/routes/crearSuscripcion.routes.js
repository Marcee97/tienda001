const express = require("express");
const router = express.Router();

const {crearSuscripcion} = require("../controllers/crearSuscripcion/crearSuscripcion.js")

router.post('/', crearSuscripcion);

module.exports = router;
