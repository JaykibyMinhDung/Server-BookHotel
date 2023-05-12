const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomsSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  maxPeople: {
    type: Number,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  roomNumbers: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Rooms", roomsSchema);
