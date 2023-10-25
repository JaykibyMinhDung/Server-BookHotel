const express = require("express");
const path = require("path");

const app = express();

const bodyParse = require("body-parser");
const flash = require("connect-flash");
const multer = require("multer");

const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBstore = require("connect-mongodb-session")(session);

const LoginAdmin = require("./routes/Authenticated");
const homepageAdmin = require("./routes/Dashbroad");

// const flash = require("connect-flash")

// Databas mongoDB
// const url = "mongodb://127.0.0.1:27017/admin";
const url = "mongodb://127.0.0.1:27017/admin";
const User = require("./models/user");

// MiddleWare of third 3
const store = new mongoDBstore({
  uri: url, // kết nối
  collection: "sessions", // Tạo tên cho collection
  // có thể thêm tùy chọn khác ở đây
});

app.use(
  session({
    secret: "my secret", // Cái này sẽ tạo ra mã băm riêng của chúng ta
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  // destination: (req, file, cb) => {
  //   cb(null, path.join(__dirname, "/images/"));
  // },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().setTime(new Date().getTime()) + "-" + file.originalname
    );
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

app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn; // error
  // res.locals.csrfToken = req.csrfToken();
  res.locals.adminHotel = req.session.isAdmin;
  res.locals.message = req.flash();
  next();
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public"))); // Lây đường dẫn tương đối từ các tệp trong file public, nghĩa là href="/css/style.css"
app.use(bodyParse.urlencoded({ extended: false })); // Lấy các dữ liệu từ body và header
app.use(bodyParse.json());
app.use(
  multer({
    storage: fileStorage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: fileFilter,
  }).any()
  // multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use((req, res, next) => {
  // req là gì
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

// Tạo một liên kết để chuyển hướng đến trang đăng nhập admin (a href"" Truy cập với quyền admin ? /a)
app.use(LoginAdmin);
app.use(homepageAdmin);

mongoose
  .connect(url, { useNewUrlParser: true })
  .then((result) => {
    app.listen(3001);
    // npm install --save-dev webpack@5.82.0 --legacy-peer-deps
    // npm install --legacy-peer-deps
  })
  .catch((err) => {
    console.log(err);
  });

// password:"$2a$12$0k0G/Z7mVMtFXZ3Az4pwtuuIp08FvHvL3xDJTLdwlfwkZUE7P.InS",
// email:"doanminhdung123@gmail.com"
