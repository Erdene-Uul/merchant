
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "funplus-mn",
  api_key: "618188745148635",
  api_secret: "JvECmRMBRsAAVOSzeMGnh5zHnuo",
});

// console.log(process);

module.exports = { cloudinary };
