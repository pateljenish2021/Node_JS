const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/dbConnection");
const Book = require("./models/book.model");
const Favorite = require("./models/favorite.model");

const server = express();
const PORT = 3000;

connectDB();

server.use(bodyParser.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "public")));

server.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("index", { books });
});

server.get("/admin", async (req, res) => {
  const books = await Book.find();
  const book = req.query.edit ? await Book.findById(req.query.edit) : null;
  res.render("admin", { books, book });
});

server.post("/admin/add-book", async (req, res) => {
  await Book.create(req.body);
  res.redirect("/admin");
});

server.post("/admin/update", async (req, res) => {
  await Book.findByIdAndUpdate(req.body.id, req.body);
  res.redirect("/admin");
});

server.post("/admin/delete", async (req, res) => {
  await Book.findByIdAndDelete(req.body.id);
  res.redirect("/admin");
});

server.get("/book", async (req, res) => {
  const book = await Book.findById(req.query.id);
  res.render("book", { book });
});

server.get("/favorites/book", async (req, res) => {
  const book = await Book.findById(req.query.id);
  res.render("book", { book });
});

server.get("/favorites", async (req, res) => {
  const favorites = await Favorite.find();
  const books = await Promise.all(
    favorites.map(async (fav) => await Book.findById(fav.bookId))
  );
  res.render("fav", { books });
});


server.post("/add-favorite", async (req, res) => {
  const book = await Book.findById(req.body.bookId);
  if (book) {
    const alreadyFav = await Favorite.findOne({ bookId: book._id });
    if (!alreadyFav) {
      await Favorite.create({
        bookId: book._id,
        name: book.name,
        author: book.author,
        imageUrl: book.imageUrl,
      });
    }
  }
  res.redirect("/favorites");
});

server.post("/remove-favorite", async (req, res) => {
  await Favorite.findOneAndDelete({ bookId: req.body.id });
  res.redirect("/favorites");
});


server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
