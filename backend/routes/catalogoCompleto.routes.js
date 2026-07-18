const express = require("express")
const { getCatalogoCompleto } = require("../controllers/variantes.js")



const router = express.Router();
router.get("/", getCatalogoCompleto);

module.exports = router;