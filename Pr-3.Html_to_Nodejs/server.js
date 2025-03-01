const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const server = express();
const port = 3000;

server.set("view engine", "ejs");
server.use("/", express.static(path.join(__dirname, "public")));
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
    res.render("index");
});

server.get("/buttons", (req, res) => {
    res.render("buttons");
});

server.get("/cards", (req, res) => {
    res.render("cards");
});

server.get("/colors", (req, res) => {
    res.render("utilities-colors");
});

server.get("/borders", (req, res) => { 
    res.render("utilities-borders");
});

server.get("/animations", (req, res) => {
    res.render("utilities-animations");
});

server.get("/other", (req, res) => {
    res.render("utilities-other");
});

server.get("/login", (req, res) => {
    res.render("login");
});

server.get("/register", (req, res) => {
    res.render("register");
});

server.get("/forgot", (req, res) => {
    res.render("forgot-password");
});

server.get("/404page", (req, res) => {
    res.render("404");
})

server.get("/blank", (req, res) => {
    res.render("blank");
});

server.get("/charts", (req, res) => {
    res.render("charts");
});

server.get("/tables", (req, res) => {
    res.render("tables");
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});