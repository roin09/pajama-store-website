const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fs = require("fs");
const redisCli = require("./redis");
module.exports = {
  sign: (user) => {
    //access token 발급
    const payload = {
      id: user.userId,
    };
    const privateKey = process.env.SECRET_KEY;
    return jwt.sign(payload, privateKey, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
  },
  verify: (token) => {
    let decoded = null;
    const privateKey = process.env.SECRET_KEY;
    try {
      decoded = jwt.verify(token, privateKey);
      return {
        ok: true,
        id: decoded.id,
      };
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

  refreshVerify: async (token, userId) => {
    const getAsync = promisify(redisCli.get).bind(redisCli);
    const privateKey = process.env.SECRET_KEY;
    try {
      const data = await getAsync(userId);
      if (token === data) {
        try {
          jwt.verify(token, privateKey);
          return true;
        } catch (err) {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  },
};
