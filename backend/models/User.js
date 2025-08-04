const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userStatus: { type: Number, required: true },
  token: { type: String },
  role: { type: String, default: 'user' },
});

module.exports = mongoose.model("User", userSchema);
