const jwt = require("jsonwebtoken");
const secretKey = "123";

const signPayloadToToken = (payload) => jwt.sign(payload, secretKey);
const verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = { signPayloadToToken, verifyToken };
