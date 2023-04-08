const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const redis = require("../utils/redis");
const cookies = require("../utils/cookies");

router.get("/", cookies.getCookie, redis.refreshVerify, user.refreshAuth);
router.post("/", cookies.getCookie, redis.refreshVerify, user.refreshAuth);
module.exports = router;
