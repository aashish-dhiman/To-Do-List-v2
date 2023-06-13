const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
console.log(date());
require("dotenv").config();

const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.static("public"));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.set("view engine", "ejs");

const items = [];
const workItems = [];

app.get("/", function (req, res) {
    const day = date();

    res.render("list", {
        listTitle: day,
        listItems: items,
    });
});

app.post("/", (req, res) => {
    // console.log(req.body);
    const newItem = req.body.newItem;
    if (req.body.list === "Work List") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        items.push(newItem);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        listItems: workItems,
    });
});

app.listen(PORT, function () {
    console.log("Server started on port " + PORT);
});
