module.exports = (req, res, next) => {
  // console.log(req.headers);
  // if (!req.session.isLoggedIn) {
  //   return res.redireact("/");
  // }
  next();
};
