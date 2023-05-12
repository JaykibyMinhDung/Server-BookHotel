const express = require("express");
const path = require("path");

const app = express();

const bodyParse = require("body-parser");

const homepageAdmin = require("./routes/Dashbroad");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParse.urlencoded({ extended: false }));

app.use(homepageAdmin);

app.listen(3001);
