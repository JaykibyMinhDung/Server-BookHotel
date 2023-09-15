// strict mode
const path = require("path");
const {validationResult} = require('express-validator')
const Hotels = require("../models/hotel");
const Users = require("../models/user");
const Transactions = require("../models/transaction");
const Rooms = require('../models/room')

exports.getDashbroad = (req, res, next) => {
  const date = new Date();
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
  // const DetailHotels =
  function getFirstDayofMonth(year, month) {
    return new Date(year, month, 2);
  }
  const firstDay = getFirstDayofMonth(date.getFullYear(), date.getMonth());
  function getLastDayofMonth(year, month) {
    return new Date(year, month, 31);
  }
  const lastDay = getLastDayofMonth(date.getFullYear(), date.getMonth());
  Transactions.find({
    $and: [{ dateStart: { $gt: firstDay } }, { dateEnd: { $lt: lastDay } }],
  })
    .sort({ dateStart: "asc" }) //desc
    .exec()
    .then((transaction) => {
      Users.find().then((user) => {
        if (!transaction) {
          res.render("Dashbroad", {
            path: "/dashbroad",
            pageTitle: "Admin Page",
            Heading: "Latest Transactions",
            titleHead: titleTable,
            products: [],
            users: user,
            notfound: "Không tìm thấy khách sạn nào",
          });
        } else {
          res.render("Dashbroad", {
            path: "/dashbroad",
            pageTitle: "Admin Page",
            Heading: "Latest Transactions",
            titleHead: titleTable,
            users: user,
            products: transaction,
          });
        }
      });
      // return res.json({
      //   array: transaction,
      // });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
    });
  // <%- include('../includes/navigation.ejs') %> <%- include('../includes/head.ejs') %>
  // <% for (let product of prods) { %>
  {
    /* <img src="<%= product.imageUrl %>" alt="<%= product.title %>"> */
  }
};

exports.gethotelList = (req, res, next) => {
  const hotelList = ["ID", "Name", "Type", "Title", "City", "Action"];
  Hotels.find().then(hotel => {
    if (hotel.length > 0) {
      res.render("admin/hotelList", {
        path: "/hotelList",
        pageTitle: "hotel List",
        Heading: "Hotels List",
        titleHead: hotelList,
        products: hotel,
      });
    } else {
      res.render("admin/hotelList", {
        path: "/hotelList",
        pageTitle: "hotel List",
        Heading: "Hotels List",
        titleHead: hotelList,
        products: hotel,
        notfound: 'Không tìm thấy dữ liệu khách sạn nào'
      });
    }
  }).catch((err) => {
    const error = new Error(err);
    error.httpStatusCode = 500;
  })
};

exports.postNewHotelList = (req, res, next) => {
  const {Name, City, Description, far, Type, Address, Title, Price, Feature, Rooms, Images} = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('admin/addnewhotel', {
      pageTitle: "Add Product",
      Heading: "Add New Hotel",
      path: "/hotel-list/new-hotel",
      hasError: true,
      products: {
        address: Address,
        city: City,
        desc: Description,
        cheapestPrice: Price,
        distance: far,
        featured: Feature,
        name: Name,
        photos: Images,
        rooms: Rooms,
        title: Title,
        type: Type,
      },
      erorrsMessage: errors.array()[0].msg,
    })
  }
  const newHotel = new Hotels({
    address: Address,
    city: City,
    desc: Description,
    cheapestPrice: Price,
    distance: far,
    featured: Feature,
    name: Name,
    photos: Images,
    rooms: Rooms,
    title: Title,
    type: Type,
    rating: '',
  });
  newHotel
    .save()
    .then(() => {
      req.flash('success', 'Tạo khách sạn thành công'); 
      res.redirect('/hotellist') 
      // {
      //   Heading: "Hotels List"
      // },
    })
    .catch(err => {
      console.log(err);
      res.send('<h2 style="text-align: center">Lỗi hệ thống, vui lòng quay lại trang trước</h2>')
    })
}

exports.getAddnewHotel = (req, res, next) => {
  // const hotelList = ["ID", "Name", "Type", "Title", "City", "Action"];
  const errors = validationResult(req);
  res.render("admin/addnewhotel", {
    path: "/hotellist/newhotel",
    pageTitle: "Add New Hotel",
    Heading: "Add New Hotel",
    erorrsMessage: [],
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
  Rooms.find()
  .then(room => {
    if(room.length > 0) {
      res.render("admin/roomsList", {
      path: "/rooms-list",
      pageTitle: "Rooms List",
        Heading: "Rooms List",
        titleHead: roomList,
        products: room,
        erorrsMessage: [],
      });
    } else {
      res.render("admin/hotelList", {
        path: "/hotelList",
        pageTitle: "hotel List",
        Heading: "Hotels List",
        titleHead: roomList,
        products: room,
        notfound: 'Không tìm thấy dữ liệu'
      });
    }
  })
  .catch()
};


exports.postNewRoomList = (req, res, next) => {
  const { description, title, price, numberPeople, hotel, roomNumbers} = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('admin/addnewroom', {
      pageTitle: "Add Product",
      Heading: "Add New Room",
      path: "/room-list/new-room",
      hasError: true,
      products: {
        desc: description,
        maxPeople: numberPeople,
        price: price,
        title: title,
      },
      erorrsMessage: errors.array()[0].msg,
    })
  }
  const newRoom = new Rooms({
    createdAt: new Date(),
    // updatedAt: ,
    desc: description,
    maxPeople: numberPeople,
    price: price,
    roomNumbers: [].push(roomNumbers),
    title: title,
  });
  newRoom
    .save()
    .then(new_room => {
      Hotels.find({name: hotel}).then(hotel => {
        hotel.rooms.push(new_room._id.toString())
        return hotel.save()
      })
    })
    .then(() => {
      req.flash('success', 'Tạo phòng thành công'); 
      res.redirect('/roomlist') 
    })
    .catch(err => {
      console.log(err);
      res.send('<h2 style="text-align: center">Lỗi hệ thống, vui lòng quay lại trang trước</h2>')
    })
};

exports.getaddnewRooms = (req, res, next) => {
  res.render("admin/addnewRoom", {
    path: "/addnewrooms",
    pageTitle: "Add New Room",
    Heading: "Add New Room",
    erorrsMessage: [],
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
