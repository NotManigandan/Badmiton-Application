const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");  //For capitalizing

const app = express();

app.set('view engine', 'ejs');

//enable express to parse URL-encoded body i.e. info from HTML form
app.use(express.urlencoded({ extended: true }));

//enable express to access static files in folder called "public"
app.use(express.static("public"));

//mongoose.connect("mongodb://127.0.0.1:27017/badmitonDB", { useNewUrlParser: true });

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server has been initiated on port " + PORT);
});
