const { Restaurant } = require("../models/Restaurant");

// Get all restaurants
async function getAllRestaurants(req, res) {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);
  }
}

// Get restaurant by ID
async function getRestaurantById(req, res) {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
  }
}

// Get menu for a restaurant
async function getRestaurantMenu(req, res ) {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant.menu);
  } catch (error) {
    console.log(error);
  }
}

// Add item to a restaurant's menu
async function addItemToMenu(req, res ) {
  try {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const newItem = {
      name,
      description,
      price,
      image,
    };

    restaurant.menu.push(newItem);
    await restaurant.save();

    res.status(201).json({ message: "Item added to menu successfully" });
  } catch (error) {
    console.log(error);
  }
}
// Delete item from a restaurant's menu
async function deleteItemFromMenu(req, res) {
  try {
    const { id, itemId } = req.params;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const itemIndex = restaurant.menu.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in menu" });
    }

    restaurant.menu.splice(itemIndex, 1);
    await restaurant.save();

    res.status(202).json({ message: "Item deleted from menu successfully" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantMenu,
  addItemToMenu,
  deleteItemFromMenu,
};
