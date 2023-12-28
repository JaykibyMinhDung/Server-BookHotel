const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SignUp
exports.postNewUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password.trim();
  const fullName = req.body.fullName;
  const username = req.body.username;
  const phoneNumber = req.body.phoneNumber;
  const isAdmin = req.body.isAdmin;
  User.findOne({ email: email.trim() }).then((hasAccount) => {
    if (hasAccount) {
      return res.json({
        message:
          "Tài khoản người dùng đã tồn tại, vui lòng đăng kí tài khoản khác",
        statusCode: 0,
      });
    }
  });
  if (email === "" || email === undefined) {
    return res.json({
      message: "Email không được để trống",
      statusCode: 0,
    });
  } else if (password === "" && password === undefined) {
    return res.json({
      message: "Password không được để trống",
      statusCode: 0,
    });
  }
  // Mã hóa password
  bcrypt
    .hash(password, 12)
    .then((hasbcryPass) => {
      const user = new User({
        email: email,
        password: hasbcryPass,
        username: username,
        fullName: fullName,
        phoneNumber: phoneNumber,
        isAdmin: isAdmin,
      });
      return user.save();
    })
    .then((results) => {
      console.log(results);
      // res.redirect("http://localhost:3000/signin");
      res.status(201).json({
        message: "Tạo người dùng mới thành công",
        userId: results._id,
        statusCode: 1,
      });
    })
    .catch((err) => {
      console.log(err); // Hiện lỗi phía server
      // res.status(400).json({
      //   message:
      //     "Không thể đăng kí, vui lòng kiểm tra lại thông tin hoặc liên hệ lại kĩ thuật để được hỗ trợ",
      //   statusCode: 0,
      // });
    });
};

// exports.getValidUser = (req, res, next) => {
//   res.json({ hasEmail: true });
// };

// login
exports.postValidUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let AddTokenUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log("SignUp error");
        res.status(401).json({ message: "Email hoặc mật khẩu chưa đúng" });
      }
      AddTokenUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((account) => {
      if (!account) {
        const error = new Error("Email hoặc mật khẩu chưa đúng!");
        throw error;
        // return res.redirect(`http://localhost:3000/signin`);
      }
      const token = jwt.sign(
        {
          email: AddTokenUser.email,
          userId: AddTokenUser._id.toString(),
        },
        "websitebookhotelsvietnam",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: AddTokenUser._id.toString(),
        emailUser: AddTokenUser.email,
        numberphone: AddTokenUser.phoneNumber,
        fullname: AddTokenUser.fullName,
      });
    })

    .catch((err) => {
      res.status(401).json({ message: err.message, StatusCode: 0 });
      // "Not found user !"
      console.log(err);
    });
};
