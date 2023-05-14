const path = require("path");

exports.getDashbroad = (req, res, next) => {
  res.render("Dashbroad", {
    path: "/dashbroad",
    pageTitle: "Admin Page",
  });
  // <%- include('../includes/navigation.ejs') %> <%- include('../includes/head.ejs') %>
  // <% for (let product of prods) { %>
  {
    /* <img src="<%= product.imageUrl %>" alt="<%= product.title %>"> */
  }
};
