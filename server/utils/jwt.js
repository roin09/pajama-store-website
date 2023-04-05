const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fs = require("fs");
const privateKey = process.env.SECRET_KEY;
// const redisClient = require("./redis");
const redisClient = require("./redis");

module.exports = {
  sign: (user) => {
    //access token 발급
    const privateKey = process.env.SECRET_KEY;
    const payload = {
      userId: user.userId,
    };

    return jwt.sign(payload, privateKey, {
      algorithm: "HS256",
      expiresIn: "1m",
    });
  },
  verify: (token) => {
    try {
      const privateKey = process.env.SECRET_KEY;
      const decoded = jwt.verify(token, privateKey);

      if (decoded) {
        return { ok: true, message: err.message };
      } else {
        return { ok: false, message: err.message };
      }
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  refresh: () => {
    //refresh token payload 없이 발급
    const privateKey = process.env.SECRET_KEY;
    return jwt.sign({}, privateKey, {
      algorithm: "HS256",
      expiresIn: "14d",
    });
  },
};
