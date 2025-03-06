const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/dbConnection");
const Book = require("./models/book.model");
const Favorite = require("./models/favorite.model");

const app = express();
const PORT = 3000;

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("index", { books });
});

app.get("/admin", async (req, res) => {
  const books = await Book.find();
  const book = req.query.edit ? await Book.findById(req.query.edit) : null;
  res.render("admin", { books, book });
});

app.post("/admin/add-book", async (req, res) => {
  await Book.create(req.body);
  res.redirect("/admin");
});

app.post("/admin/update", async (req, res) => {
  await Book.findByIdAndUpdate(req.body.id, req.body);
  res.redirect("/admin");
});

app.post("/admin/delete", async (req, res) => {
  await Book.findByIdAndDelete(req.body.id);
  res.redirect("/admin");
});

app.get("/book", async (req, res) => {
  const book = await Book.findById(req.query.id);
  res.render("book", { book });
});

app.get("/favorites/book", async (req, res) => {
  const book = await Book.findById(req.query.id);
  res.render("book", { book });
});

app.get("/favorites", async (req, res) => {
  const favorites = await Favorite.find();
  res.render("fav", { books: favorites });
});

app.post("/add-favorite", async (req, res) => {
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
  res.redirect("/");
});

app.post("/remove-favorite", async (req, res) => {
  await Favorite.findByIdAndDelete(req.body.id);
  res.redirect("/favorites");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
