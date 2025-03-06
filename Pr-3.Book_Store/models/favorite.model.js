const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  name: String,
  author: String,
  imageUrl: String,
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;
