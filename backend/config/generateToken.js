const jwt = require("jsonwebtoken");

const generateToken = (access_token, userId) => {
  return jwt.sign({ access_token, userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = generateToken;
