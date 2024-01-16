const fs = require("fs");

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Hotels = require("../model/hotel");
const Rooms = require("../model/room");
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
              { expiresIn: "7d" }
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
  const date = new Date();
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
    // .skip()
    .limit(8)
    .exec()
    .then((transactions) => {
      return res.status(200).json({
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

exports.gethotelList = (req, res, next) => {
  const pageNumber = req.query?.pageNumber || 1;
  const documentSkip = (pageNumber - 1) * 8;
  Hotels.find()
    .skip(documentSkip)
    .limit(8)
    .then((hotel) => {
      if (hotel.length > 0) {
        return res.status(200).json({
          statusCode: 200,
          message: "Nhận thông tin khách sạn thành công",
          ListHotel: hotel,
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          message: "Không có khách sạn nào cả, vui lòng tạo thêm",
          ListHotel: [],
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRoomsList = (req, res, next) => {
  const pageNumber = req.query?.pageNumber || 1;
  const documentSkip = (pageNumber - 1) * 8;
  Rooms.find()
    // .skip(documentSkip)
    // .limit(8)
    .then((room) => {
      Hotels.find()
        .then((hotel) => {
          let responseData;
          for (const element of hotel) {
            responseData = element.rooms.map((e) => {
              if (e === room._id) {
                return {
                  ...element._doc,
                  idHotel: element.name,
                };
              }
            });
          }
          if (room.length > 0) {
            return res.status(200).json({
              statusCode: 200,
              message: "Nhận thông tin phòng thành công",
              ListRoom: responseData,
            });
          } else {
            return res.status(200).json({
              statusCode: 200,
              message: "Không có phòng nào cả, vui lòng tạo thêm",
              ListRoom: [],
            });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDetailHotel = (req, res, next) => {
  try {
    const idHotel = req.params?.id;
    if (idHotel) {
      Hotels.findById(idHotel).then((hotel) => {
        res.json({
          statusCode: 200,
          hotelDetail: hotel,
          message: "Nhận thông tin chi tiết khách sạn thành công",
        });
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 200,
      message: "Nhận chi tiết khách sạn thất bại, vui lòng liên hệ kĩ thuật",
    });
  }
};

exports.postNewHotelList = (req, res, next) => {
  // const idUpdated = req.params?.id;
  const imageArr = [];
  console.log(req.files);
  // for (const key of req.files) {
  //   imageArr.push(key.path.replace(/\\/g, "/"));
  // }
  const {
    Name,
    City,
    Description,
    Distance,
    Type,
    Address,
    Title,
    Price,
    Feature,
    Rooms,
  } = req.body;
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      statusCode: 403,
      message:
        errors.array()[0].msg === "Invalid value"
          ? "Vui lòng không bỏ trống giá trị"
          : "Dữ liệu chưa đúng vui lòng điền lại",
    });
  }
  const newHotel = new Hotels({
    address: Address,
    city: City,
    desc: Description,
    cheapestPrice: Price,
    distance: Distance,
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
      res.json({ statusCode: 200, message: "Tạo khách sạn thành công" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updatedHotelList = (req, res, next) => {
  const idUpdated = req.params?.id;
  const imageArr = [];
  // console.log(req.files);
  for (const key of req.files) {
    imageArr.push(key.path.replace(/\\/g, "/"));
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      statusCode: 400,
      message:
        errors.array()[0].msg === "Invalid value"
          ? "Vui lòng không bỏ trống giá trị"
          : "Dữ liệu chưa đúng vui lòng điền lại",
    });
  }
  const obj = JSON.parse(JSON.stringify(req.body));
  const newObj = {
    name: obj.Name,
    city: obj.City,
    address: obj.Address,
    distance: obj.Distance,
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
      res.json({ statusCode: 200, message: "Cập nhật khách sạn thành công" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Rooms

exports.getOptionHotels = (req, res, next) => {
  Hotels.find()
    .then((hotel) => {
      const nameHotel = hotel.map((e) => e.name);
      res.json({
        stausCode: 200,
        optionHotel: nameHotel,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewRoomList = (req, res, next) => {
  const { description, title, price, numberPeople, hotel, roomNumbers } =
    req.body;
  const arrNumberRooms = roomNumbers.split(",").map((e) => e.trim());
  const newRoom = new Rooms({
    createdAt: new Date(),
    desc: description,
    maxPeople: numberPeople,
    price: price,
    roomNumbers: [...arrNumberRooms],
    title: title,
  });
  console.log(newRoom);
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
          res.json({ statusCode: 200, message: "Tạo phòng thành công" });
        })
        .catch((err) => {
          res.json({
            statusCode: 400,
            message: "Chọn hotel trước khi tạo phòng mới",
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updatedRoom = (req, res, next) => {
  const idUpdated = req.params.id;
  const { roomNumbers } = req.body;
  const arrNumberRooms = roomNumbers.split(",").map((e) => e.trim());
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      statusCode: 400,
      message:
        errors.array()[0].msg === "Invalid value"
          ? "Vui lòng không bỏ trống giá trị"
          : "Dữ liệu chưa đúng vui lòng điền lại",
    });
  }
  const obj = JSON.parse(JSON.stringify(req.body));
  const newObj = {
    roomNumbers: [...arrNumberRooms],
    maxPeople: obj.numberPeople,
    desc: obj.description,
    price: obj.price,
    // hotel: obj.hotel,
    title: obj.title,
    updatedAt: new Date(),
  };
  return Rooms.findByIdAndUpdate({ _id: idUpdated }, newObj, {
    new: true,
    upsert: true,
  })
    .then((room) => {
      res.json({ statusCode: 200, message: "Cập nhật phòng thành công" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteHotelList = (req, res, next) => {
  const id = req.params.id;
  Transactions.find({ hotel: id })
    .then((hotel) => {
      if (hotel.length) {
        res.json({
          statusCode: 400,
          message:
            "Xóa khách sạn thất bại, vui lòng liên hệ kĩ thuật để khắc phục sự cố",
        });
      } else {
        Hotels.findOneAndDelete({ _id: id })
          .then((results) => {
            // console.log(results);
            if (results?.photos.length) {
              for (const pathImg of results.photos) {
                fs.unlink(pathImg, function (err) {
                  console.log(err);
                });
              }
            }
            res.json({
              statusCode: 200,
              message: "Xóa khách sạn thành công",
            });
          })
          .catch((err) => {
            console.log(err);
          });
        // Lát xóa khách sạn
      }
    })
    .catch((err) => console.log(err));
};

exports.deleteRoomList = (req, res, next) => {
  const idDeleted = req.params.id; // id roó
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
        // console.log(checkBookedRoom());
        // console.log(idDeleted);
        res.json({
          statusCode: 400,
          message: "Xóa phòng thất bại, do có phòng đang đặt",
        });
      } else {
        Hotels.findById(idHotel)
          .then((hotel) => {
            const indexIdRoom = hotel.rooms.findIndex((e) => e === idDeleted);
            if (indexIdRoom !== -1) {
              hotel.rooms.splice(indexIdRoom, 1);
              hotel.save();
            } else {
              res.json({
                statusCode: 400,
                message: "Không tìm thấy khách sạn",
              });
            }
          })
          .then(() => {
            Rooms.findByIdAndDelete(idDeleted).then((results) => {
              if (results) {
                res.json({ statusCode: 200, message: "Xóa phòng thành công" });
              } else {
                res.json({
                  statusCode: 400,
                  message:
                    "Xóa phòng thất bại, vui lòng thử lại hoặc liên hệ với kĩ thuật",
                });
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
        // Lát xóa khách sạn
      }
    })
    .catch((err) => console.log(err));
};
