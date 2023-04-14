const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new S3Client();
dotenv.config();
module.exports = {

  upload: 
}
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "item-database",
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
