const Hotel = require("../model/hotel");

const Rooms = require("../model/room");

const Transactions = require("../model/transaction");

const mongoose = require("mongoose");

exports.getCountHotel = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      if (!hotels) {
        res.json({
          statusCode: 500,
          message: " Not found hotel.",
        });
      }
      const filterCity = (city) => {
        return hotels.filter((e) => e.city === city);
      };
      return res.status(200).json({
        hotel: hotels,
        HaNoi: filterCity("Ha Noi").length,
        SG: filterCity("Ho Chi Minh").length,
        DaNang: filterCity("Da Nang").length,
      });
    })
    .catch((err) => console.log(err));
};

exports.postHotel = (req, res, next) => {
  const nameHotel = req.body.nameHotel;
  const typeHotel = req.body.typeHotel;
  const cityHotel = req.body.cityHotel;
  const addressHotel = req.body.addressHotel;
  const distanceHotel = req.body.distanceHotel;
  const photoHotel = req.body.photoHotel;
  const descHotel = req.body.descHotel;
  const ratingHotel = req.body.ratingHotel;
  const featuredHotel = req.body.featuredHotel;
  const roomsHotel = req.body.roomsHotel;
  const hotel = new Hotel({
    nameHotel: nameHotel,
    typeHotel: typeHotel,
    cityHotel: cityHotel,
    addressHotel: addressHotel,
    distanceHotel: distanceHotel,
    photoHotel: photoHotel,
    descHotel: descHotel,
    ratingHotel: ratingHotel,
    featuredHotel: featuredHotel,
    roomsHotel: roomsHotel,
  });
  hotel
    .save()
    .then((results) => {
      console.log(results);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getGenreHotel = (req, res, next) => {
  console.log(req.body);
  res.send("genreHotel");
};

exports.getRatingHotel = (req, res, next) => {
  Hotel.find()
    .then((Datahotel) => {
      if (!Datahotel) {
        return res.json({
          statusCode: 500,
          message: "Not found data",
        });
      }
      return res.status(200).json({
        Datahotel,
      });
    })
    .catch((err) => console.log("getRatingHotel" + err));
};

// Tìm kiếm hotel
exports.serchHotels = (req, res, next) => {
  const location = req.body.data.city; // Vi trí khách sạn
  const people = req.body.data.amountPeople; // Số lượng người
  const timeClient = req.body.data.time; // Thời gian đặt phòng
  const start_date = new Date(timeClient[0].startDate).toISOString(); // Thời gian bắt đầu đặt phòng
  const end_date = new Date(timeClient[0].endDate).toISOString(); // Thời gian kết thúc đặt phòng
  // Tong so nguoi
  const totalPeople = people.adult + people.children; // Tổng số người đặt phòng

  // thue bao nhieu phong, vd: 2 nguoi, 2 phong => khach san co 2 phong con trống va maxPeople > 1. Số người ở maxPeople sẽ bằng số người/ số phòng =>
  Rooms.find()
    .then((resultRooms) => {
      Hotel.find({ city: location }).then((resultHotel) => {
        if (resultHotel) {
          // Lọc các phòng có số người phù hợp, nhưng những phòng này chưa rõ có người ở hay không
          let hotelsSearch = [];
          let roomsSearch = [];
          let results = [];
          const suitableRooms = resultRooms.filter((e) => {
            return e.maxPeople >= totalPeople / people.room;
          });

          for (const iterator of suitableRooms) {
            for (let i = 0; i < resultHotel.length; i++) {
              resultHotel[i].rooms.map((e) => {
                if (
                  e === iterator._id.toString() &&
                  iterator.roomNumbers.length * iterator.maxPeople >=
                    totalPeople && // Số người tối đa có thể ở
                  iterator.roomNumbers.length >= people.room // Tổng số phòng đặt phải có lượng phòng lớn hơn số phòng khách đặt
                ) {
                  hotelsSearch.push(resultHotel[i]); // Khách sạn
                  results.push(iterator); // Phòng có số người phù hợp với tìm kiếm
                }
              });
            }
          }

          // Dữ liệu trả về cho front-end có phòng phù hợp số lượng người và địa điểm tìm kiếm
          for (let i = 0; i < results.length; i++) {
            const element = hotelsSearch[i];
            const numberArrRoom = element.rooms.length;
            if (numberArrRoom) {
              element.rooms.map((e) => {
                if (e === results[i].id) {
                  roomsSearch.push({
                    name: element.name,
                    distance: element.distance,
                    tag: element.featured,
                    type: results[i].title,
                    description: results[i].desc,
                    free_cancel: element.featured,
                    price: results[i].price,
                    rating: element.rating,
                    rate_text:
                      element.rating > 8
                        ? "Excellent"
                        : element.rating < 5
                        ? "Bad"
                        : "Good",
                    photos: element.photos[0],
                    id: element.id,
                    idRoom: results[i]._id,
                    rooms: element.rooms,
                  });
                }
              });
            }
          }

          // Lọc các khách sạn giống nhau
          const UniqueHotel = [];
          function lonelyarr(a) {
            a.sort(); // && a[i - 1]?.name !== a[i].name
            for (let i = 0; i < a.length; i++) {
              if (a[i + 1]?.name !== a[i].name) {
                UniqueHotel.push(a[i]);
              }
            }
            return UniqueHotel;
          }

          // Kiểm tra phòng có chỗ trống không
          Transactions.find({
            $or: [
              {
                // Ngày kết thúc trong khoảng đang đặt
                $and: [
                  {
                    dateStart: {
                      $lt: new Date(start_date),
                    },
                  },
                  {
                    dateEnd: {
                      $gt: new Date(start_date), // Lớn hơn thời gian bắt đầu
                      $lt: new Date(end_date), // Bé hơn thời gian kết thúc
                    },
                  },
                ],
              },
              {
                // Trong khoảng đang đặt
                $and: [
                  {
                    dateStart: {
                      $lt: new Date(start_date), // Ít hơn
                    },
                  },
                  {
                    dateEnd: {
                      $gt: new Date(end_date), // Lớn hơn
                    },
                  },
                ],
              },
              {
                // Ngày bắt đầu trong khoảng đang đặt
                $and: [
                  {
                    dateStart: {
                      $gt: new Date(start_date), // Lớn hơn thời gian bắt đầu
                      $lt: new Date(end_date), // nhỏ hơn thời gian kết thúc
                    },
                  },
                  {
                    dateEnd: {
                      $gt: new Date(end_date), // lớn hơn ngày kết thúc
                    },
                  },
                ],
              },
            ],
          }).then((results) => {
            const ArrayDetailRooms = [];
            // Trả về các hotel đã được đặt từ trước
            const filterRooms = (AllRoomHotelTransaction, informationRoom) => {
              // Lấy từng giao dịch trong transaction ra
              for (let i = 0; i < roomsSearch.length; i++) {
                // Lấy id phòng đã booked so sánh với tất cả các phòng trong khách sạn
                const element = results[i];
                if (element) {
                  const hasbooked = element.room.find(
                    (e) => e.id === AllRoomHotelTransaction.toString()
                  );
                  // push phòng chưa đặt
                  if (!hasbooked) {
                    return ArrayDetailRooms.push(informationRoom);
                  }
                }
              }
            };
            // In ra toàn bộ phòng thỏa mãn 2 điều kiện trên
            for (const element of roomsSearch) {
              // In ra toàn bộ kết quả trùng với ngày: Nếu có dữ liệu là [...], nếu không có dữ liệu là []
              results.map((e) => {
                // Tìm khách sạn có trùng tên với khách sạn đã book từ trước
                if (element.id === e.hotel) {
                  filterRooms(element.idRoom, element); // Truyền tất cả các phòng của khách sạn đó vào
                }
                if (element.id !== e.hotel) {
                  ArrayDetailRooms.push(element);
                }
              });
            }
            return res.json({
              results: lonelyarr(roomsSearch),
              ResultsDetailRooms: ArrayDetailRooms,
              RecordResultDetailRooms: ArrayDetailRooms.length,
            });
          });
        }
      });
    })
    .catch((err) => {
      return res.json({
        results: "Không tìm thấy phòng phù hợp",
        ResultsDetailRooms: [],
        RecordResultDetailRooms: 0,
      });
    });
};

// Trả về chi tiết khách sạn sau khi tìm kiếm
exports.detailHotel = (req, res, next) => {
  const idHotel = req.body.data.id;
  // const convertId = new mongoose.Types.ObjectId(idHotel);
  if (!idHotel) {
    return res.json({
      statusCode: 500,
      message: "Chưa có thông tin người dùng, vui lòng reload lại trang",
    });
  }
  // Valid một là trả về các hotel có phòng trống trong ngày đó và phù hợp với nhu cầu phòng
  // Valid hai là trả về id hotel khách muốn xem chi tiết, khi khách xem 1 hotel phải trả về phòng trống của khách sạn đó, rooms cũng phải trả về là các room trống

      // Có thể là mảng hoặc một string
      Hotel.findById(transaction[0]?.hotel).then((hotel) => {
        if (!hotel) {
          return res.status(200).json({
            statusCode: 0,
            message: "Không tìm thấy thông tin chi tiết hotel",
          });
        }
        Rooms.find().then((results) => {
          const ArrRoom = [];
          for (let i = 0; i < hotel.rooms.length; i++) {
            const element = hotel.rooms[i];
            results.map((e) => {
              if (element === e.id) {
                ArrRoom.push({
                  idRooms: e.id,
                  numberRooms: e.roomNumbers,
                  maxPeople: e.maxPeople,
                  typeRoom: e.title,
                  description: e.desc,
                  price: e.price,
                });
              }
            });
          }
          const ArrResults = {
            informationHotel: { ...hotel._doc }, // Cái này để lấy dữ liệu từ một schema vì cấu trúc khi lấy hơi khác mà ta cop toàn bộ sẽ ra một kiểu dữ liệu khác
            informationRoom: ArrRoom,
          };
          // Lấy mảng phòng tìm tất cả các phòng phù hợp với phòng người dùng tìm ( ví dụ: tìm khoảng 2 phòng có 3 chỗ ngủ, thì trả đúng phòng đó với số phòng đúng)
          res.status(200).json({
            statusCode: 0,
            message: "Nhận dữ liệu thành công",
            ArrResults,
          });
        });
      })
      // res.status(200).json({
      //   statusCode: 0,
      //   message: "Nhận dữ liệu thành công",
      //   ArrResults: transaction,
      // });
    .catch((err) => {
      res.status(500).json("Không tìm thấy thông tin chi tiết hotel");
      console.log(err);
    });
};

// Kiểm tra các phòng còn trống ngày hôm đó
exports.getRoomsNotBooked = (req, res, next) => {
  const inputDate = req.query;
  // const input = req.data.hotel
  console.log(inputDate);
  const startDateIOSString = new Date(inputDate.StartDate).toISOString();
  const endDateIOSString = new Date(inputDate.EndDate).toISOString();
  Transactions.find({
    $or: [
      {
        dateStart: {
          $gt: new Date(startDateIOSString),
          $lt: new Date(endDateIOSString),
        },
      },
      {
        dateEnd: {
          $gt: new Date(startDateIOSString),
          $lt: new Date(endDateIOSString),
        },
      },
    ],
  })
    .then((rooms) => {
      // Hotel.find({ _id: rooms.hotel }).then((motel) => motel.rooms);
      return res.status(200).json({
        results: rooms,
        message: rooms.length ? "Phòng đã được đặt" : "Chưa có phòng nào đặt", // Thế thì in ra các phòng chưa đặt
      });
    })
    .catch((e) => console.log(e, "Check middleware RoomNotBooked"));
};

exports.reserveDetailHotel = (req, res, next) => {
  const TransactionsData = req.body.data; // fullname, email, phonenumber, cardnumber, date, informationDate, methodpayment
  // const BookedRooms = [...TransactionsData.detailRoom.numberRoom];
  // const BookedRooms = TransactionsData.detailRoom.map((e) => e.numberRoom);
  // if (TransactionsData) {
  //   res.json({
  //     status: 201,
  //     message: "Đặt phòng thành công",
  //   });
  // }
  // Tim eamil de save

  // Doi chieu thoi gian trong server
  // const totalPrice = () => {
  //   return TransactionsData.detailRoom.reduce(
  //     (pre, after) => pre.price + after.price,
  //     0
  //   );
  // };
  // Transactions.find().then((expens) => {
  //   for (let i = 0; i < expens.length; i++) {
  //     const element = expens[i];
  //     const RoomHasBooked = BookedRooms.map((Hasroom) => {
  //       return element.room.filter((e) => e === Hasroom);
  //     });
  //     if (RoomHasBooked) {
  //       res.json({
  //         statusCode: 401,
  //         test: BookedRooms,
  //         message: "Phòng đã bị trùng, vui lòng đặt sang phòng hoặc ngày khác!",
  //       });
  //     } else {
  //       res.json({
  //         test: {
  //           // startdate: formatDate(element.dateStart),
  //           // endDate: formatDate(element.dateEnd),
  //         },
  //       });
  //     }
  //   }
  // });
  const ArrayDataTransaction = {
    user: TransactionsData.user.FullName,
    hotel: TransactionsData.detailHotel,
    room: TransactionsData.detailRoom,
    dateStart: new Date(TransactionsData.date.startDate),
    dateEnd: new Date(TransactionsData.date.endDate),
    price: TransactionsData.totalPrice,
    payment: TransactionsData.user.payment,
    status: "Booked",
  };
  const transactions = new Transactions(ArrayDataTransaction);
  transactions
    .save()
    .then((results) => {
      // console.log(results);
      return res.status(200).json({
        status: 201,
        message: "Đặt phòng thành công",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        status: 400,
        message: "Đặt phòng không thành công, do thông tin không hợp lệ",
      });
    });
};

exports.transactionHotel = (req, res, next) => {
  // const TransactionsData = req.body.data;
  // Lấy name hotel
  Transactions.find()
    .then((DataTransactionHotel) => {
      if (!DataTransactionHotel) {
        return res.json({
          statusCode: 500,
          message: "Not found data",
        });
      }
      Hotel.findById(DataTransactionHotel.hotel).then((e) => {
        console.log(DataTransactionHotel.hotel);
        return res.status(200).json([
          ...DataTransactionHotel,
          // nameHotel: e.name,
        ]);
      });
    })
    .catch((err) => {
      console.log("getRatingHotel" + err);
      res.status(400).json({
        status: 200,
        message: "Not found transaction",
      });
    });
};
