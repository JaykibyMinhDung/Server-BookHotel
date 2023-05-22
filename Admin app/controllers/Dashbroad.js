const path = require("path");

exports.getDashbroad = (req, res, next) => {
  const titleTable = [
    "ID",
    "User",
    "Hotel",
    "Room",
    "Date",
    "Price",
    "Payment Method",
    "Status",
  ];
  res.render("Dashbroad", {
    path: "/dashbroad",
    pageTitle: "Admin Page",
    Heading: "Latest Transactions",
    titleHead: titleTable,
  });
  // <%- include('../includes/navigation.ejs') %> <%- include('../includes/head.ejs') %>
  // <% for (let product of prods) { %>
  {
    /* <img src="<%= product.imageUrl %>" alt="<%= product.title %>"> */
  }
};

exports.gethotelList = (req, res, next) => {
  const hotelList = ["ID", "Name", "Type", "Title", "City", "Action"];
  res.render("admin/hotelList", {
    path: "/hotelList",
    pageTitle: "hotel List",
    Heading: "Hotels List",
    titleHead: hotelList,
  });
};

exports.getAddnewHotel = (req, res, next) => {
  // const hotelList = ["ID", "Name", "Type", "Title", "City", "Action"];
  res.render("admin/addnewhotel", {
    path: "/addnewhotel",
    pageTitle: "Add New Hotel",
    Heading: "Add New Hotel",
    // hotel: hotelList,
  });
};

exports.getroomsList = (req, res, next) => {
  const roomList = [
    "ID",
    "Title",
    "Description",
    "Price",
    "Max People",
    "Action",
  ];
  res.render("admin/roomsList", {
    path: "/roomsList",
    pageTitle: "Rooms List",
    Heading: "Rooms List",
    titleHead: roomList,
  });
};

exports.getaddnewRooms = (req, res, next) => {
  // const hotelList = ["ID", "Name", "Type", "Title", "City", "Action"];
  res.render("admin/addnewRoom", {
    path: "/addnewrooms",
    pageTitle: "Add New Room",
    Heading: "Add New Room",
    // hotel: hotelList,
  });
};

exports.gettransactionList = (req, res, next) => {
  const titleTable = [
    "ID",
    "User",
    "Hotel",
    "Room",
    "Date",
    "Price",
    "Payment Method",
    "Status",
  ];
  res.render("admin/transactionList", {
    path: "/alltransaction",
    pageTitle: "Transaction List",
    Heading: "Transactions List",
    titleHead: titleTable,
  });
};
