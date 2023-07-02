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
      return res.json({ announce: "Account has existed" });
    }
  });
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
      res.status(201).json({ message: "User created!", userId: results._id });
    })
    .catch((err) => {
      console.log(err); // Hiện lỗi phía server
      res.status(400).json({
        message: "Not signup new user, please check again information",
      });
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
        res.status(401).json({ message: "Please type again email" });
      }
      AddTokenUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((account) => {
      if (!account) {
        const error = new Error("Wrong password!");
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
      });
    })

    .catch((err) => {
      res.status(401).json({ message: "Not found user !", StatusCode: 500 });
      console.log(err);
    });
};
