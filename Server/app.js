// libary of node js
const path = require("path");

// Libary of third party
const express = require("express");
const bodyparse = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// connect path of app

const app = express();

// Route
const Homepage = require("./routes/homePage");
// const Authenticate = require("./routes/AuthenticateForm")

// MiddleWare of third 3

app.use(bodyparse.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//

app.use(cors(), Homepage);

//
app.use((req, res, next) => {
  res.status(404).send("<h1>Xem lại backend nhé !</h1>");
});

// fetch dữ liệu cho front-end và lấy dữ liệu từ fetch đó, dữ liệu truyền về đã lọc. Front-end sẽ lấy dữ liệu dưới dạng json và truyền vào các biến như API

mongoose
  .connect("mongodb://127.0.0.1:27017/admin")
  .then((results) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err.message);
  });
