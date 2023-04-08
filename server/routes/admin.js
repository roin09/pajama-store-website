const express = require("express");
const router = express.Router();
const item = require("../controllers/item");

router.post("/additem", item.additem);
router.get("/getitem", item.getitem);

module.exports = router;
