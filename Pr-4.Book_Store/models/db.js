const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/bookstore")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  description: String,
  imageUrl: String,
});

const FavoriteSchema = new mongoose.Schema({
  bookId: mongoose.Schema.Types.ObjectId,
  name: String,
  author: String,
  imageUrl: String,
});

const Book = mongoose.model("Book", BookSchema);
const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = { Book, Favorite };