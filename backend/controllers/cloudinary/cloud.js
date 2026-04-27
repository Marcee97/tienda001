// config/cloudinary.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "root",
  api_key: "735735855673795",
  api_secret: "niEEq_iHhM_UygZPeWuwFlEDOGs",
});

module.exports = cloudinary;