exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    title: "login",
    path: "/login",
  });
};
