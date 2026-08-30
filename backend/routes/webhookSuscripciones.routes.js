const express = require("express");


const router = express.Router();
const { webhookSuscripciones } = require("../controllers/webhookSuscripciones/webhookSuscripciones.js");

router.post('/', webhookSuscripciones);

module.exports = router;
