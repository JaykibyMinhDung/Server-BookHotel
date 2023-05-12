const path = require("path");

exports.getDashbroad = (req, res, next) => {
  res.render("Dashbroad", {
    path: "/dashbroad",
    pageTitle: "Admin Page",
  });
};
