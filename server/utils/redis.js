// const redis = require("redis");
// const { createClient } = require("redis");

// const client = createClient();

// client.on("error", (err) => console.log("Redis Client Error", err));
// client.connect();
// async function setVal(key, value) {
//   return await client.set(key, value, {
//     EX: 14,

//   });
// }
// async function getVal(key) {
//   return await client.get(key);
// }

// module.exports = { setVal, getVal };
const redis = require("redis");
const { createClient } = require("redis");

const redisClient = redis.createClient({
  legacyMode: true,
});
redisClient.moduleList("connect", () => {
  console.info("redis connected");
});
redisClient.on("error", (err) => {
  console.error("redis client error", err);
});

redisClient.connect().then();
const setKey = async (key, value, num) => {
  await redisClient.set(key, value, "EX", num);
};
const getKey = async (key) => {
  return await redisClient.get(key);
};
module.exports = { redisClient, setKey, getKey };

// const Redis = require("ioredis");

// const redis = new Redis({
//   port: 6379,
//   host: "localhost",
//   username: "master",
//   password: "mp1204",
//   db: 0,
// });
// module.exports = redis;
