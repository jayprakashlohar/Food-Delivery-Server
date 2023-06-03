const express = require("express");
const restaurentRouter = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantMenu,
  addItemToMenu,
  deleteItemFromMenu,
} = require("../controllers/restaurantController");


restaurentRouter.route("/restaurants").get(getAllRestaurants);
restaurentRouter.route("/restaurants/:id").get(getRestaurantById);
restaurentRouter.route("/restaurants/:id/menu").get(getRestaurantMenu);

restaurentRouter.route("/restaurants/:id/menu").post(addItemToMenu);
restaurentRouter.route("/restaurants/:id/menu/:id").post(deleteItemFromMenu);

module.exports = { restaurentRouter };