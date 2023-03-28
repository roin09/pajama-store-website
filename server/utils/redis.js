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
const redis = require("redis");
const { createClient } = require("redis");

const client = createClient({
  url: `redis://127.0.0.1:6379`,
  legacyMode: true,
});
(async () => {
  await client.connect();

  // using callbacks
  client.set("key", "value", (err) => {
    if (err) return err;

    client.get("key", (err, value) => {
      if (err) return console.error(err);

      return value; // should log 'value'
    });
  });

  // using promises
  await client.v4.set("key", "value");
  console.log(await client.v4.get("key")); // should log 'value'
})();
module.exports = client;
