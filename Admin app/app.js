const express = require("express");
const path = require("path");

const app = express();

const bodyParse = require("body-parser");

const LoginAdmin = require("./routes/Authenticated");
const homepageAdmin = require("./routes/Dashbroad");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public"))); // Lây đường dẫn tương đối từ các tệp trong file public, nghĩa là href="/css/style.css"
app.use(bodyParse.urlencoded({ extended: false })); // Lấy các dữ liệu từ body và header

// Tạo một liên kết để chuyển hướng đến trang đăng nhập admin (a href"" Truy cập với quyền admin ? /a)
app.use(LoginAdmin);
app.use(homepageAdmin);

app.listen(3001);
