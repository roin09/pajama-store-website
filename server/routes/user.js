const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const redis = require("../utils/redis");
//create user
// router.post("/", user.create);

//get user info
// router.get("/:userId?", user.find);

//delete user

// router.delete("/:userId", user.remove);

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

router.post("/", user.register);
router.post("/login", user.login);
router.get("/logout", user.logout);
router.get("/profile", user.editProfile);
router.post("/refresh", redis.refreshVerify, user.refreshAuth);

module.exports = router;
