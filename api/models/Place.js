const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  country: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkin: Number,
  checkout: Number,
  maxGuests: Number,
  price: Number,
});
const PlaceModel = mongoose.model("Place", PlaceSchema);

module.exports = PlaceModel;
