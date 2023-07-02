const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("User", userSchema);
