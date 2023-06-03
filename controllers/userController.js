const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

// User Register
async function registerUser(req, res, next) {
  try {
    const { name, email, password, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    // Hashed the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
}

// User Login

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "food@masai", {
      expiresIn: "24h",
    });
    res.status(200).json({ msg: "user logged in", token });
  } catch (error) {
    next(error);
  }
}

module.exports = { registerUser, loginUser };
