const sharp = require("sharp");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const Item = require("../models/Item");
const dotenv = require("dotenv");
const s3 = new S3Client();
dotenv.config();
module.exports.additem = async (req, res) => {
  try {
    // const imgUrl = req.file.location;
    // const s3Key = req.file.key;
    // const imgFile = s3.getObject({ Bucket: "item-database", Key: s3Key });
    const imgUrl = req.file.location;
    const exItem = await Item.findOne({ id: req.body.id });
    if (exItem)
      return res.status(409).send({ message: "이미 등록된 상품ID 입니다" });

    // const imgorigin = await sharp(imgUrl).resize({ width: 300, height: 250 });
    // const imgWebp = await sharp(imgUrl)
    //   .webp({ lossless: true })
    //   .resize({ width: 300, height: 250 });
    const item = new Item({
      id: req.body.id,
      itemName: req.body.itemName,
      imgs: imgUrl,
      webpImgs: null,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      sale: req.body.sale,
      type: req.body.type,
    });

    //document 저장
    await item.save();

    return res.status(200).send(item);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.getitem = async (req, res) => {
  try {
    const resData = req.query;
    const itemCategory = String(resData.category);

    if (resData) {
      const item = await Item.find({ category: itemCategory });
      if (!item) return res.status(404).send("item not found");

      return res.status(200).send(item);
    }
    // 성공 if (Id) {
    //   const filteredUser = User.filter((user) => user.userId === Number(Id));
    //   if (!filteredUser) {
    //     return res.status(404).send("Users not found");
    //   }
    //   return res.json(filteredUser);
    // }
    // return res.send(User);

    //userId = { "id" : "1"}
    //userId.id = 1
    //실패 if (userId) {
    //   User.map((user) => {
    //     if (Number(userId) === user.userId) {
    //       return res.send(user);
    //     } else {
    //       return res.status(404).send("Users not found");
    //     }
    //   });
    // }
    // //req.params.username 없으면 모든 유저 리턴
    // return res.send(User);
  } catch (err) {
    return res.status(500).send(err);
  }
};
