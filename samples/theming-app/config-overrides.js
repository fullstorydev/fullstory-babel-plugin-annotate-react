const { override } = require("customize-cra");
const { disableBabelCache } = require("customize-cra-disable-babel-cache");
 
module.exports = override(
  process.env.NODE_ENV === "development" && disableBabelCache()
);
