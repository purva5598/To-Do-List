const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];  // Store items for the home page
let workitems = [];  // Store items for the work list

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listtitle: day,
    newlistitems: items,  // Render the 'items' array for the main list
  });
});

app.post("/", function (req, res) {
  var item = req.body.newitem;

  // Add the new item to the 'items' array
  items.push(item);

  res.redirect("/");  // Redirect to the home page to render the updated list
});

app.get("/work", function (req, res) {
  res.render("list", {
    listtitle: "Work List",  // Set the title for the work list
    newlistitems: workitems,  // Render the 'workitems' array for the work list
  });
});

app.post("/work", function (req, res) {
  let item = req.body.newitem;

  // Add the new item to the 'workitems' array
  workitems.push(item);
  res.redirect("/work");  // Redirect to the work page to render the updated work list
});

// Route to clear the items array
app.post("/clear", function (req, res) {
  items = [];  // Empty the items array
  res.redirect("/");  // Redirect to the home page with the list cleared
});

app.listen(3000, function () {
  console.log("server running");
});
