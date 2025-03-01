const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const server = express();
const port = 3000;

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: true }));


let tasks = [
    { id: uuidv4(), text: "Buy groceries", status: "pending", createdAt: "10:00 AM, Feb 25" },
    { id: uuidv4(), text: "Complete project", status: "completed", createdAt: "11:30 AM, Feb 25" },
    { id: uuidv4(), text: "Go for a run", status: "pending", createdAt: "07:00 AM, Feb 25" }
];

let editTask = null;

server.get("/", (req, res) => {
    res.render("index", { tasks, filter: "all", editTask });
    editTask = null;
});

server.get("/pending", (req, res) => {
    res.render("index", { tasks, filter: "pending", editTask });
});

server.get("/completed", (req, res) => {
    res.render("index", { tasks, filter: "completed", editTask });
});

server.post("/add", (req, res) => {
    const taskText = req.body.task;
    const taskId = req.body.taskId;

    if (taskId) {
        const task = tasks.find((t) => t.id === taskId);
        if (task) task.text = taskText;
    } else if (taskText.trim() !== "") {
        const newTask = {
            id: uuidv4(),
            text: taskText,
            status: "pending",
            createdAt: new Date().toLocaleString("en-US", { 
                hour: "2-digit", 
                minute: "2-digit", 
                day: "2-digit", 
                month: "short" 
            }) 
        };
        tasks.push(newTask);
    }
    res.redirect("/");
});

server.post("/edit", (req, res) => {
    const taskId = req.body.id;
    editTask = tasks.find((task) => task.id === taskId) || null;
    res.redirect("/");
});

server.post("/delete", (req, res) => {
    const taskId = req.body.id;
    tasks = tasks.filter((task) => task.id !== taskId);
    res.redirect("/");
});

server.post("/update-status", (req, res) => {
    const taskId = req.body.id;
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
        task.status = task.status === "pending" ? "completed" : "pending";
    }
    res.redirect("/");
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});