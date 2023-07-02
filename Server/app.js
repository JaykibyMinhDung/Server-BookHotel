// libary of node js
const path = require("path");

// Libary of third party
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const multer = require("multer"); // gói về download and upload file

// connect path of app

const app = express();
const uri = "mongodb://127.0.0.1:27017/admin";

// Route
const Homepage = require("./routes/homePage");
// const { collection } = require("./model/hotel");
// const Authenticate = require("./routes/AuthenticateForm")

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().setTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded({ extended: false })); // Nhan tu form
app.use(bodyParser.json()); // Nhận file kiểu json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
//  Dùng app use ở đây sẽ truyền được xuống các miđleware bên dưới như một middleware xác nhận

app.use(flash());

// Phá CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTION, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(Homepage);

app.use((req, res, next) => {
  res.status(500).json({ message: "Server error", SatusCode: 500 });
});

// fetch dữ liệu cho front-end và lấy dữ liệu từ fetch đó, dữ liệu truyền về đã lọc. Front-end sẽ lấy dữ liệu dưới dạng json và truyền vào các biến như API

mongoose
  .connect(uri)
  .then((results) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err.message);
  });
