const redis = require("redis");
const createClient = require("redis");

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
const redisCli = redisClient;
// const client = redis.createClient();
// const redisClient = client.connect();

module.exports = redisCli;
