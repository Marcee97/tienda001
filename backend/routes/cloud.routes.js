const express = require("express");

const router = express.Router();

router.post("/upload", (req, res) => {
    console.log("aca estoy")
    res.send("el send de cloud")
})

module.exports = router;