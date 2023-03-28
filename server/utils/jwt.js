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
      id: user.userId,
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
      const result = decoded.id;
      if (result) {
        return {
          ok: true,
          id: result,
        };
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

  refreshVerify: (userId) => {
    try {
      // try 바깥에서 const ~ 선언이었음
      // async (userId), await getAsync 였음

      // const getAsync = promisify(redisClient.getKey).bind(redisClient);
      const data = redisClient.getKey(userId);

      if (data) {
        // RT 있음
        return {
          ok: true,
          data: data,
        };
      } else {
        // RT 없음
        return {
          ok: false,
          data: data,
        };
      }
    } catch (err) {
      return { ok: false };
    }
  },
};
