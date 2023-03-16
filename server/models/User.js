const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userId: String,
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

module.exports = User;
