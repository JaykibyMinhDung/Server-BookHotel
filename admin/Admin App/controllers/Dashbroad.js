// strict mode
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const Hotels = require("../models/hotel");
const Users = require("../models/user");
const Transactions = require("../models/transaction");
const Rooms = require("../models/room");

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
    .limit(8)
    .exec()
    .then((transaction) => {
      Users.find().then((user) => {
        Hotels.find().then((hotel) => {
          const ArrayHotel = [];
          transaction.map((trans) => {
            for (let i = 0; i < hotel.length; i++) {
              const element = hotel[i];
              if (trans.hotel === element._id.toString()) {
                ArrayHotel.push(element.name);
              }
            }
          });
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
              namehotel: ArrayHotel,
            });
          }
        });
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
  const hotelList = [
    "ID",
    "Name",
    "Type",
    "Title",
    "City",
    "Action",
    "Updated",
  ];
  Hotels.find()
    .skip()
    .limit(8)
    .then((hotel) => {
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
          notfound: "Không tìm thấy dữ liệu khách sạn nào",
        });
      }
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
    });
};

exports.deleteHotelList = (req, res, next) => {
  const id = req.params.id;
  Transactions.find({ hotel: id })
    .then((hotel) => {
      if (hotel.length) {
        req.flash(
          "success",
          "Xóa khách sạn thất bại, do có khách sạn đang đặt"
        );
        return res.redirect("/hotellist");
      } else {
        Hotels.findOneAndDelete({ _id: id })
          // function(err, photo) {
          //   fs.unlink(photo.path, function() {
          //     res.send ({
          //       status: "200",
          //       responseType: "string",
          //       response: "success"
          //     });
          //   });
          // }
          .then((results) => {
            // console.log(results);
            if (results.photos.length) {
              for (const pathImg of results.photos) {
                fs.unlink(pathImg, function (err) {
                  console.log(err);
                });
              }
            }
            req.flash("success", "Xóa khách sạn thành công");
            return res.redirect("/hotellist");
          })
          .catch((err) => {
            console.log(err);
            req.flash(
              "success",
              "Xóa khách sạn thất bại, vui lòng liên hệ kĩ thuật để khắc phục sự cố"
            );
          });
        // Lát xóa khách sạn
      }
    })
    .catch((err) => console.log(err));
};

exports.postNewHotelList = (req, res, next) => {
  const idUpdated = req.params.id;
  const imageArr = [];
  // console.log(req.files);
  for (const key of req.files) {
    imageArr.push(key.path.replace(/\\/g, "/"));
  }
  const {
    Name,
    City,
    Description,
    far,
    Type,
    Address,
    Title,
    Price,
    Feature,
    Rooms,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/addnewhotel", {
      pageTitle: idUpdated ? "Updated Product" : "Add Product",
      Heading: idUpdated ? "Updated Hotel" : "Add New Hotel",
      path: "/hotel-list/new-hotel",
      updated: null,
      hasError: true,
      products: {
        name: Name,
        city: City,
        address: Address,
        distance: far,
        desc: Description,
        cheapestPrice: Price,
        featured: Feature,
        photos: imageArr,
        rooms: Rooms,
        title: Title,
        type: Type,
      },
      erorrsMessage:
        errors.array()[0].msg === "Invalid value"
          ? "Vui lòng không bỏ trống giá trị"
          : "Dữ liệu chưa đúng vui lòng điền lại",
    });
  }
  if (idUpdated) {
    const obj = JSON.parse(JSON.stringify(req.body));
    const newObj = {
      name: obj.Name,
      city: obj.City,
      address: obj.Address,
      distance: obj.far,
      desc: obj.Description,
      cheapestPrice: obj.Price,
      featured: obj.Feature,
      photos: imageArr,
      rooms: obj.Rooms,
      title: obj.Title,
      type: obj.Type,
    };
    return Hotels.findByIdAndUpdate({ _id: idUpdated }, newObj, { new: true })
      .then((hotel) => {
        req.flash("success", "Cập nhật khách sạn thành công");
        res.redirect("/hotellist");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const newHotel = new Hotels({
    address: Address,
    city: City,
    desc: Description,
    cheapestPrice: Price,
    distance: far,
    featured: Feature,
    name: Name,
    photos: imageArr,
    rooms: Rooms,
    title: Title,
    type: Type,
    rating: "",
  });
  newHotel
    .save()
    .then(() => {
      req.flash("success", "Tạo khách sạn thành công");
      res.redirect("/hotellist");
      // {
      //   Heading: "Hotels List"
      // },
    })
    .catch((err) => {
      console.log(err);
      res.send(
        '<h2 style="text-align: center">Lỗi hệ thống, vui lòng quay lại trang trước</h2>'
      );
    });
};

exports.getAddnewHotel = (req, res, next) => {
  // const hotelList = ["ID", "Name", "Type", "Title", "City", "Action"];
  const idUpdated = req.params?.id;
  const errors = validationResult(req);
  if (idUpdated) {
    Hotels.findById(idUpdated).then((hotel) => {
      res.render("admin/addnewhotel", {
        path: `/hotellist/updated-hotel/${idUpdated}`,
        pageTitle: "Updated Hotel",
        Heading: "Updated Hotel",
        updated: hotel,
        erorrsMessage: [],
      });
    });
  } else {
    res.render("admin/addnewhotel", {
      path: "/hotellist/newhotel",
      pageTitle: "Add New Hotel",
      Heading: "Add New Hotel",
      updated: null,
      erorrsMessage: [],
    });
  }
};

exports.getroomsList = (req, res, next) => {
  const roomList = [
    "ID",
    "Title",
    "Description",
    "Price",
    "Max People",
    "Action",
    "Updated",
  ];
  Rooms.find()
    .then((room) => {
      const arrTest = [];
      if (room.length > 0) {
        Hotels.find()
          .then((hotel) => {
            for (const key of hotel) {
              room.map((r) => {
                const a = key.rooms.find((e) => e === r.id);
                if (a) {
                  r._doc.hotel = key.id;
                  arrTest.push(r);
                }
              });
            }
          })
          .then(() => {
            // console.log(arrTest);
            res.render("admin/roomsList", {
              path: "/rooms-list",
              pageTitle: "rooms List",
              Heading: "Rooms List",
              titleHead: roomList,
              products: arrTest,
              // hotel: ,
              erorrsMessage: [],
            });
          });
      } else {
        res.render("admin/hotelList", {
          path: "/hotelList",
          pageTitle: "hotel List",
          Heading: "Hotels List",
          titleHead: roomList,
          products: room,
          // hotel: null,
          notfound: "Không tìm thấy dữ liệu",
        });
      }
    })
    .catch();
};

exports.deleteRoomList = (req, res, next) => {
  const idDeleted = req.params.id;
  const idHotel = req.query.idHotel;
  Transactions.find({ hotel: idHotel })
    .then((transaction) => {
      const checkBookedRoom = () => {
        for (const key of transaction) {
          const bookedRoom = key.room.find((e) => e.id === idDeleted);
          return bookedRoom;
        }
      };
      if (checkBookedRoom()) {
        console.log(checkBookedRoom());
        console.log(idDeleted);
        req.flash("success", "Xóa phòng thất bại, do có phòng đang đặt");
        return res.redirect("/roomlist");
      } else {
        Hotels.findById(idHotel)
          .then((hotel) => {
            const indexIdRoom = hotel.rooms.findIndex((e) => e === idDeleted);
            if (indexIdRoom !== -1) {
              hotel.rooms.splice(indexIdRoom, 1);
              hotel.save();
            }
          })
          .then(() => {
            Rooms.findByIdAndDelete(idDeleted).then((results) => {
              if (results) {
                req.flash("success", "Xóa phòng thành công");
                return res.redirect("/roomlist");
              } else {
                req.flash(
                  "success",
                  "Xóa phòng thất bại, vui lòng thử lại hoặc liên hệ với kĩ thuật"
                );
                return res.redirect("/roomlist");
              }
            });
          })
          .catch((err) => {
            console.log(err);
            req.flash(
              "success",
              "Xóa phòng thất bại, vui lòng liên hệ kĩ thuật để khắc phục sự cố"
            );
          });
        // Lát xóa khách sạn
      }
    })
    .catch((err) => console.log(err));
};

exports.postNewRoomList = (req, res, next) => {
  const { description, title, price, numberPeople, hotel, roomNumbers } =
    req.body;
  const idUpdated = req.params.id;
  const arrNumberRooms = roomNumbers.split(",").map((e) => e.trim());
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return Hotels.find().then((hotel) => {
      const nameHotel = hotel.map((e) => e.name);
      console.log(errors.array());
      req.flash("success", "Cập nhật phòng thất bại");
      return res.status(422).render("admin/addnewroom", {
        pageTitle: "Add New Room",
        Heading: "Add New Room",
        path: "/room-list/new-room",
        hasError: true,
        updated: null,
        name: nameHotel,
        products: {
          desc: description,
          maxPeople: numberPeople,
          price: price,
          title: title,
          roomNumbers: roomNumbers,
        },
        erorrsMessage:
          errors.array()[0].msg === "Invalid value"
            ? "Vui lòng không bỏ trống giá trị"
            : "Dữ liệu chưa đúng vui lòng điền lại",
      });
    });
  }

  if (idUpdated && errors.isEmpty()) {
    const obj = JSON.parse(JSON.stringify(req.body));
    const newObj = {
      createdAt: new Date().toISOString(),
      desc: obj.description,
      maxPeople: obj.numberPeople,
      price: obj.price,
      title: obj.title,
      roomNumbers: arrNumberRooms,
    };
    return Rooms.findByIdAndUpdate({ _id: idUpdated }, newObj, { new: true })
      .then((new_room) => {
        Hotels.find({ name: hotel })
          .then((dataHotel) => {
            for (const room of dataHotel) {
              const existRoom = room.rooms.find((e) => e === idUpdated);
              if (!existRoom) {
                room.rooms.push(new_room._id.toString());
                return room.save();
              }
            }
          })
          .then(() => {
            req.flash("success", "Cập nhật phòng thành công");
            res.redirect("/roomlist");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const newRoom = new Rooms({
    createdAt: new Date(),
    desc: description,
    maxPeople: numberPeople,
    price: price,
    roomNumbers: [...arrNumberRooms],
    title: title,
  });
  newRoom
    .save()
    .then((new_room) => {
      return Hotels.find({ name: hotel })
        .then((dataHotel) => {
          for (const room of dataHotel) {
            room.rooms.push(new_room._id.toString());
            return room.save();
          }
        })
        .then(() => {
          req.flash("success", "Tạo phòng thành công");
          res.redirect("/roomlist");
        });
    })
    .catch((err) => {
      console.log(err);
      // res.send(
      //   '<h2 style="text-align: center">Lỗi hệ thống, vui lòng quay lại trang trước</h2>'
      // );
    });
};

exports.getaddnewRooms = (req, res, next) => {
  const idUpdated = req.params?.id;
  if (idUpdated) {
    return Rooms.findById(idUpdated).then((room) => {
      Hotels.find()
        .then((hotel) => {
          const deletedOptionExist = () => {
            // let nameHotelUpdated;
            for (const AllNumberRooms of hotel) {
              const checkExits = AllNumberRooms.rooms.find(
                (e) => e === idUpdated
              );
              if (checkExits) {
                // nameHotelUpdated = AllNumberRooms.name;
                const indexHotel = hotel.findIndex(
                  (e) => e.id === AllNumberRooms.id
                );
                hotel.splice(indexHotel, 1);
                const nameHotel = hotel.map((e) => e.name);
                console.log(AllNumberRooms.name);
                res.render("admin/addnewRoom", {
                  path: "/updaterooms",
                  pageTitle: "Updated Room",
                  Heading: "Updated Room",
                  erorrsMessage: [],
                  updated: room,
                  nameHotelUpdated: AllNumberRooms.name,
                  name: nameHotel,
                });
                return true;
              }
            }
          };
          if (!deletedOptionExist()) {
            const nameHotel = hotel.map((e) => e.name);
            return res.render("admin/addnewRoom", {
              path: "/updaterooms",
              pageTitle: "Updated Room",
              Heading: "Updated Room",
              erorrsMessage: [],
              updated: room,
              name: nameHotel,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  Hotels.find()
    .then((hotel) => {
      const nameHotel = hotel.map((e) => e.name);
      res.render("admin/addnewRoom", {
        path: "/addnewrooms",
        pageTitle: "Add New Room",
        Heading: "Add New Room",
        updated: null,
        erorrsMessage: [],
        name: nameHotel,
      });
    })
    .catch((err) => {
      console.log(err);
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
  Transactions.find().then((transaction) => {
    Hotels.find().then((hotel) => {
      const ArrayHotel = [];
      transaction.map((trans) => {
        for (let i = 0; i < hotel.length; i++) {
          const element = hotel[i];
          if (trans.hotel === element._id.toString()) {
            ArrayHotel.push(element.name);
          }
        }
      });
      res.render("admin/transactionList", {
        path: "/alltransaction",
        pageTitle: "transaction List",
        Heading: "Transactions List",
        titleHead: titleTable,
        products: transaction,
        Namehotel: ArrayHotel,
      });
    });
  });
};
