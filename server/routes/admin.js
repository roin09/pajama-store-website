const express = require("express");
const router = express.Router();
const item = require("../controllers/item");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new S3Client();
dotenv.config();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "item-database",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

router.post(
  "/additem",
  upload.single("sumFile"),
  function (req, res, next) {
    console.log(req.file);
    const { category, type, itemName, price, brand, sale } = req.body;
    return next();
  },
  item.additem
);
router.get("/getitem", item.getitem);

module.exports = router;
