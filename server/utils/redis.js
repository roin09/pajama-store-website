// const redis = require("redis");
// const { createClient } = require("redis");

// const redisClient = redis.createClient({
//   legacyMode: true,
//   port: 6379,
// });
// redisClient.moduleList("connect", () => {
//   console.info("redis connected");
// });
// redisClient.on("error", (err) => {
//   console.error("redis client error", err);
// });

// redisClient.connect().then();
// const setKey = async (key, value, num) => {
//   await redisClient.set(key, value, "EX", num);
// };
// const getKey = async (key) => {
//   const result = await redisClient.get(key);
//   return result;
// };
// module.exports = { redisClient, setKey, getKey };

// // const Redis = require("ioredis");

// // const redis = new Redis({
// //   port: 6379,
// //   host: "localhost",
// //   username: "master",
// //   password: "mp1204",
// //   db: 0,
// // });
// // module.exports = redis;

//2
// const redis = require("redis");
// require("dotenv").config();

// const redisClient = redis.createClient();

// redisClient.on("error", (err) => console.log("Redis Client Error", err));

// module.exports = redisClient;
//3
// const redis = require("redis");
// const { createClient } = require("redis");

// const redisClient = redis.createClient({
//   url: `redis://127.0.0.1:6379`,
//   legacyMode: true,
// });
// redisClient.on("error", (err) => console.log(err));
// redisClient.moduleList("connect", () => {
//   console.info("redis connected");
// });
// redisClient.connect();

// const getRedisAsync = async (key, callback) => {
//   const value = await redisClient.GET(key);
//   if (value === null) {
//     callback(new Error("failed to get data"));
//   } else {
//     callback(null, value);
//   }
// };
// const setRedisAsync = async (key, value, num) => {
//   await redisClient.set(key, value, "EX", num);
// };

// const onConnectCallback = (callback) => {
//   redisClient.on("connect", () => {
//     callback();
//   });
// };

// module.exports = { getRedisAsync, setRedisAsync, onConnectCallback };
const express = require("express");
const { promisify } = require("util");
const dotenv = require("dotenv");
const jwt = require("./jwt");
const redis = require("redis");
const { createClient } = require("redis");
dotenv.config();

const client = createClient({
  url: `redis://127.0.0.1:6379`,
  legacyMode: true,
});
(async () => {
  client.on("connect", () => {
    console.info("Redis connected!");
  });
  client.on("error", (err) => {
    console.error("Redis Client Error", err);
  });
  await client.connect();

  // using callbacks
  // client.set("key", "value", (err) => {
  //   if (err) return err;

  //   client.get("key", (err, value) => {
  //     if (err) return console.error(err);

  //     return value; // should log 'value'
  //   });
  // });

  // using promises
  // await client.v4.set("key", "value");
  // console.log(await client.v4.get("key")); // should log 'value'
})();
module.exports = {
  refreshVerify: async (req, res, next) => {
    if (req.headers.authorization) {
      const authToken = req.headers.authorization.split("Bearer ")[1];
      const userId = req.body.id;
      const userRefreshToken = req.body.refreshToken;
      const authResult = jwt.verify(authToken);
      // const refreshResult = client.get(userId, (err, value) => {
      //   if (err) return err;
      //   return value; // should log 'value'
      // });
      const getAsync = promisify(client.get).bind(client);
      const refreshResult = await getAsync(userId);
      if (authResult.ok === false && authResult.message === "jwt expired") {
        if (refreshResult === userRefreshToken) {
          req.data = userId;
          next();
        } else {
          res.status(401).send({
            ok: false,
            message: "Invalid Token",
          });
        }
      } else {
        res.status(200).send({
          ok: true,
          message: "Access token is not expired",
        });
      }
    } else {
      res.status(400).send({
        ok: false,
        message: "Access token and refresh token are needed",
      });
    }
  },

  setRefresh: (key, value, num) => {
    client.set(key, value, "EX", num);
  },
};
