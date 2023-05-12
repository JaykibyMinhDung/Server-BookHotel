const User = require("../model/user");

exports.getNewUser = (req, res, next) => {
  // res.send(req.body);
  User.find()
    .then((results) =>
      res.json(
        results.map((e) => {
          return { email: e.email, id: e._id };
        })
      )
    )
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  //   const fullName = req.body.fullName;
  //   const username = req.body.username;
  //   const phoneNumber = req.body.phoneNumber;
  //   const isAdmin = req.body.isAdmin;
  User.findOne({ email: email, password: password })
    .then((result) => {
      if (result) {
        return res.json({ announce: "Account has already" });
      } else {
        const SignupUser = new User({
          email: email,
          password: password,
          // username: username,
          // fullName: fullName,
          // phoneNumber: phoneNumber,
          // isAdmin: isAdmin,
        });

        SignupUser.save()
          .then((result) => {
            console.log(result);
            res.redirect("http://localhost:3000/signin");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getValidUser = (req, res, next) => {
  res.json({ hasEmail: true });
};

exports.postValidUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((results) => {
      if (results) {
        // console.log(results);
        User.findOne({ password: password }).then((results) => {
          if (results) {
            res.redirect(`http://localhost:3000/${results._id}`);
            //   res.json({ confirmAuth: true });
          } else {
            // res.redirect("http://192.168.1.243:3000/signin");
            res.redirect(`http://localhost:3000/signin`);
            // throw new Error("Not found user !");
          }
        });
      } else {
        res.status(401).send("Please type input");
      }
    })
    .catch((err) => {
      res.json(err.message);
      console.log(err);
    });
};
