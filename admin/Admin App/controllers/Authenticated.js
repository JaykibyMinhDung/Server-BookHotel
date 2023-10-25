const crypto = require("crypto");

const bcrypt = require("bcryptjs");

const User = require("../models/user");
// const {
//   validationResults,
// } = require("express-validator/declarations/validator");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login",
    path: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(422).render("auth/login", {
        path: "/login", // Không có trả về trang login
        pageTitle: "login",
        // errorMessage: "Invalid email or password",
        // oldInput: {
        //   email: email,
        //   password: password,
        // },
        // validationErrors: [],
      });
      // res.status(401).json("Not found user!");
    }
    if (!user.isAdmin) {
      return res.status(422).render("auth/login", {
        path: "/login", // Không có trả về trang login
        pageTitle: "login",
      });
      // res.status(401).json("Not admin");
    }

    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            // Lưu các thay đổi ở trên
            // Hàm save sau khi lưu sẽ thực hiện in lỗi và chuyển hướng về trang chủ
            console.log(err, "52");
            res.redirect("/admin");
            // res.status(200).json("login successful");
          });
        }
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "login",
          // errorMessage: "Invalid email or password",
          // oldInput: {
          //   email: email,
          //   password: password,
          // },
          // validationErrors: [],
        });
        // return res.status(401).json("not found user!");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/"); // Bắt lỗi dành riêng cho dev backend ( Mai sau sẽ chỉnh sang dev người dùng )
      });
  });
  // })
};

/*
tk: doanminhdung123@gmail.com
mk: 12345
*/
