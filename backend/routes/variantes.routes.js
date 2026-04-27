const express = require("express")
const { getVariantes } = require("../controllers/variantes.js")



const router = express.Router();
router.post("/", getVariantes);

module.exports = router;