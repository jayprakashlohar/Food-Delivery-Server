const express = require("express");
const orderRouter = express.Router();
const {
  placeOrder,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

orderRouter.route("/orders").post(placeOrder);
orderRouter.route("/orders/:id").get(getOrderById);
orderRouter.route("/orders/:id").patch(updateOrderStatus);

module.exports = { orderRouter };
