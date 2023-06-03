const jwt = require("jsonwebtoken");

function generateToken(payload) {
  const secretKey = process.env.JWT_SECRET;

  return jwt.sign(payload, secretKey, { expiresIn: "24" });
}

function verifyToken(token) {
  const secretKey = process.env.JWT_SECRET;
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, verifyToken };
