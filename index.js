const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userService");
const { restaurentRouter } = require("./routes/restaurantService");
const { orderRouter } = require("./routes/orderService");

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to food delivery app ");
});

app.use("/api", userRouter);
app.use("/api", restaurentRouter);
app.use("/api", orderRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("db to connect success!");
  } catch (error) {
    console.log(error);
  }
  console.log(`Listing on port ${PORT}`);
});
