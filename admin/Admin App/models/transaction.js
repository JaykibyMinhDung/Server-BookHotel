const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: {
    type: String,
    require: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  hotel: {
    type: String,
    // ref: "Hotel",
    require: true,
  },
  room: {
    type: Array,
    require: true,
  },
  dateStart: {
    type: Date,
    require: true,
  },
  dateEnd: {
    type: Date,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  payment: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
