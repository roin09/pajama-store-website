const mongoose = require("mongoose");
const itemSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  imgs: String,
  price: Number,
  category: String,
  brand: String,
  sale: Number,
  type: String,
});

itemSchema.pre("save", function (next) {
  const item = this;
  next();
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
