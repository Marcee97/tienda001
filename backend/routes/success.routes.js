const express = require("express");
const { getVentaByPaymentID } = require("../controllers/success/success.js");



const router = express.Router();

router.get("/:paymentID", getVentaByPaymentID); 

module.exports = router;