const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  info: String,
});
const User = mongoose.model("User", userSchema);

module.exports = User;
