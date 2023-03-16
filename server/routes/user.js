const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

//create user
router.post("/", user.create);

//get user info
router.get("/:userId?", user.find);

//delete user

router.delete("/:userId", user.remove);

module.exports = router;
