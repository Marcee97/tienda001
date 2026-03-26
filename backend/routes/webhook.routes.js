const express = require("express");
const { webhook } = require("../controllers/webhook.js");

const router = express.Router();



router.post("/", webhook)

module.exports = router;