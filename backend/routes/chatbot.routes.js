const express = require("express");

const router = express.Router();

const {chatBot} = require("../controllers/chatbot/groqService.js")

router.post("/", chatBot)

module.exports = router;