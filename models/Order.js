const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [itemSchema],
  totalPrice: { type: Number, required: true },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  status: {
    type: String,
    enum: ["placed", "preparing", "on the way", "delivered"],
    required: true,
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = { Order };
