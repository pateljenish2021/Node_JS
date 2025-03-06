const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bookstore");
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

module.exports = connectDB;