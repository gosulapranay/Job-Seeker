const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Access Denied");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // decode the userid from token and add it to req object to use it in next function
    req.userId = decode.userId;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { verifyAuth };
