const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    strictPopulate: false,
    ref: "Place",
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
});
const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;
