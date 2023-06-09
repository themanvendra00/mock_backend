const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const bookingSchema = mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  flight: { type: ObjectId, ref: "Flight" },
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = {
  BookingModel,
};
