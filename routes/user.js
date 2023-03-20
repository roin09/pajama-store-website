const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

//create user
// router.post("/", user.create);

//get user info
// router.get("/:userId?", user.find);

//delete user

// router.delete("/:userId", user.remove);

router.post("/", user.register);
router.post("/login", user.login);
router.get("/logout", user.logout);
router.get("/profile", user.editProfile);

module.exports = router;
