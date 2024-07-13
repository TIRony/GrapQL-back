// src/utils/generateToken.js
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
};

module.exports = generateToken;
