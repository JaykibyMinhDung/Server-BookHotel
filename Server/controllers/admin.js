const Hotels = require("../model/hotel");
const Rooms = require("../model/room");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Transactions = require("../model/transaction");
const User = require("../model/user");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let AddTokenUser;
  User.findOne({ email: email }).then((user) => {
    try {
      if (!user) {
        return res.status(422).json({
          statusCode: 401,
          message: "Kiểm tra lại email, email dùng để đăng nhập chưa đúng",
        });
      }
      if (!user.isAdmin) {
        return res.status(422).json({
          statusCode: 401,
          message:
            "Tài khoản không phải admin nên không thể truy cập trang web này",
        });
      }
      AddTokenUser = user;
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              {
                email: AddTokenUser.email,
                userId: AddTokenUser._id.toString(),
              },
              "websitebookhotelsadmin",
              { expiresIn: "1h" }
            );
            res.status(200).json({
              token: token,
              userId: AddTokenUser._id.toString(),
              emailUser: AddTokenUser.email,
              fullname: "Admin",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  });
};

exports.getDashbroad = (req, res, next) => {
  Transactions.find()
    .then((transactions) => {
      return res.limit(8).status(200).json({
        statusCode: 200,
        message: "Lấy giao dịch thành công",
        AllListTransaction: transactions,
      });
    })
    .catch((err) => console.log(err));
};

exports.gettransactionList = (req, res, next) => {
  Transactions.find()
    .then((transactions) => {
      return res.status(200).json({
        statusCode: 200,
        message: "Lấy giao dịch thành công",
        AllListTransaction: transactions,
      });
    })
    .catch((err) => console.log(err));
};
