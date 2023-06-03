const { Order } = require("../models/Order");

// Place an order
async function placeOrder(req, res) {
  try {
    const { user, restaurant, items, totalPrice, deliveryAddress } = req.body;

    const newOrder = new Order({
      user,
      restaurant,
      items,
      totalPrice,
      deliveryAddress,
      status: "placed",
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
  }
}

// Get order by ID
async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
}

// Update order status
async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(204).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  placeOrder,
  getOrderById,
  updateOrderStatus,
};
