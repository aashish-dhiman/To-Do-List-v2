const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
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

const mongodb_URI = process.env.MONGODB_URI;

mongoose.connect(mongodb_URI, {
    useNewUrlParser: true,
});

const itemsSchema = new mongoose.Schema({
    name: String,
});

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema],
});

//Schema for items in the list
const Item = mongoose.model("Item", itemsSchema);
//Schema for different lists
const List = mongoose.model("List", listSchema);

//Some default items
const item1 = new Item({
    name: "Welcome to ToDoList.",
});
const item2 = new Item({
    name: "Hit + button to add new item.",
});
const item3 = new Item({
    name: "Hit <— button to delete item.",
});

const defaultItem = [item1, item2, item3];

//getting current date
const day = date();

app.get("/", async function (req, res) {
    const foundItem = await Item.find({}).exec();
    if (foundItem.length === 0) {
        Item.insertMany(defaultItem)
            .then(function () {
                console.log("Successfully saved items to DB");
            })
            .catch(function (err) {
                console.log(err);
            });
        res.redirect("/");
    } else {
        // console.log(foundList);
        res.render("list", {
            listTitle: day,
            listItems: foundItem,
        });
    }
});

app.get("/:customListName", async function (req, res) {
    const customListName = req.params.customListName;

    const foundList = await List.findOne({ name: customListName }).exec();

    if (!foundList) {
        console.log("List doesn't exist");
        //Create a new list
        const list = new List({
            name: customListName,
            items: defaultItem,
        });
        list.save();
        res.redirect("/" + customListName);
    } else {
        //show the existing list
        res.render("list", {
            listTitle: foundList.name.toUpperCase(),
            listItems: foundList.items,
        });
    }
});

app.post("/", async function (req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list.toLowerCase();
    const item = new Item({
        name: itemName,
    });

    if (listName === day.toLowerCase()) {
        item.save();
        res.redirect("/");
    } else {
        const foundList = await List.findOne({ name: listName }).exec();

        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
    }
});

app.post("/delete", async (req, res) => {
    const itemID = req.body.checkbox;
    const listName = req.body.listName.toLowerCase();

    if (listName === day.toLowerCase()) {
        await Item.deleteOne({ _id: itemID })
            .then(function () {
                console.log("Successfully deleted item from DB");
            })
            .catch(function (err) {
                console.log(err);
            });
        res.redirect("/");
    } else {
        const query = await List.findOneAndUpdate(
            { name: listName },
            { $pull: { items: { _id: itemID } } }
        );
        console.log(query);

        res.redirect("/" + listName);
    }
});

app.listen(PORT, function () {
    console.log("Server started on port " + PORT);
});
