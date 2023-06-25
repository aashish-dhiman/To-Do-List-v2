const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
// console.log(date());
require("dotenv").config();

const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.static(__dirname + "/public"));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/toDoListDB", {
    useNewUrlParser: true,
});

const itemsSchema = new mongoose.Schema({
    name: String,
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to ToDoList.",
});
const item2 = new Item({
    name: "Hit + button to add new item.",
});
const item3 = new Item({
    name: "Hit <-- button to delete item.",
});

const defaultItem = [item1, item2, item3];

app.get("/", async function (req, res) {
    const day = date();

    const query = await Item.find({});
    if (query.length === 0) {
        Item.insertMany(defaultItem)
            .then(function () {
                console.log("Successfully saved items to DB");
            })
            .catch(function (err) {
                console.log(err);
            });
        res.redirect("/");
    } else {
        // console.log(query);
        res.render("list", {
            listTitle: day,
            listItems: query,
        });
    }
});

app.post("/", (req, res) => {
    // console.log(req.body);
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName,
    });

    if (req.body.list === "Work List") {
        // workItems.push(newItem);
        res.redirect("/work");
    } else {
        item.save()
            .then(function () {
                console.log("Successfully saved new item to DB");
            })
            .catch(function (err) {
                console.log(err);
            });
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        listItems: workItems,
    });
});

app.post("/delete", async (req, res) => {
    const itemID = req.body.checkbox;
    await Item.deleteOne({ _id: itemID })
        .then(function () {
            console.log("Successfully deleted item from DB");
        })
        .catch(function (err) {
            console.log(err);
        });
    res.redirect("/");
});

app.listen(PORT, function () {
    console.log("Server started on port " + PORT);
});
