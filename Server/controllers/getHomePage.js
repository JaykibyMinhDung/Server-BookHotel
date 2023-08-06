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

exports.serchHotels = (req, res, next) => {
  const location = req.body.data.city;
  const people = req.body.data.amountPeople;
  const timeClient = req.body.data.time;
  // Tong so nguoi
  const totalPeople = people.adult + people.children;

  // thue bao nhieu phong, vd: 2 nguoi, 2 phong => khach san co 2 phong con trống va maxPeople > 1. Số người ở maxPeople sẽ bằng số người/ số phòng =>
  Rooms.find().then((resultRooms) => {
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
                // hotelsSearch.push(resultHotel[i], iterator);
                hotelsSearch.push(resultHotel[i]);
                results.push(iterator);
              }
            });
          }
        }

        for (let i = 0; i < results.length; i++) {
          const element = hotelsSearch[i];
          const numberArrRoom = element.rooms.length;
          // if (element.rooms.length > 0) {
          if (numberArrRoom) {
            // console.log(element.rooms.length);
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
        Transactions.find().then((results) => {
          // console.log(results);
          const b = [];
          for (const element of roomsSearch) {
            results.map((e) => {
              if (element.id === e.hotel) {
                const isMatchDate =
                  new Date(e.dateStart).getDate() >
                    new Date(timeClient[0].endDate).getDate() ||
                  new Date(e.dateEnd).getDate() <
                    new Date(timeClient[0].startDate).getDate();
                console.log(
                  new Date(e.dateStart).getDate(),
                  new Date(timeClient[0].endDate).getDate()
                );
                return b.push(element);
                // return res.json(isMatchDate);
              }
            });
          }
          return res.json({
            results: roomsSearch,
            test: b,
          });
        });

        // }
        // return res.json("not found hotel");
      }
    });
    //     .then((hasFilterPeople) => {
    //       // Lọc các phòng đã có người ở bằng cách so sánh ngày phòng được đặt, trong khoảng từ ngày đó đến ngày người ta ra ngoài thì phòng phải trống
    //       const isMatchDate = hasFilterPeople.filter(
    //         (rooms) =>
    //           new Date(rooms.createdAt).getDate() >
    //             new Date(timeClient[0].endDate).getDate() ||
    //           new Date(rooms.updatedAt).getDate() <
    //             console.log(new Date(timeClient[0].startDate).getDate())
    //       );
    //       if (!isMatchDate.length) {
    //         return res.json({ message: "run out of room", statusCode: 400 });
    //       }
    //       return res.json(isMatchDate);
    //     });
    // })
    // .catch((err) => {
    //   console.log(err);
  });
};

exports.detailHotel = (req, res, next) => {
  const idHotel = req.body.data.id;
  const convertId = new mongoose.Types.ObjectId(idHotel);
  if (!idHotel) {
    return res.json({
      statusCode: 500,
      message: "Chưa nhận được id người dùng, vui lòng reload lại trang",
    });
  }
  Hotel.findById(convertId)
    .then((hotel) => {
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
    .catch((err) => {
      res.status(500).json("not found hotel");
      console.log(err);
    });
};

exports.reserveDetailHotel = (req, res, next) => {
  const TransactionsData = req.body.data; // fullname, email, phonenumber, cardnumber, date, informationDate, methodpayment
  // if (TransactionsData) {
  //   res.json({
  //     status: 201,
  //     message: "Đặt phòng thành công",
  //   });
  // }
  // Tim eamil de save

  // Doi chieu thoi gian trong server
  const totalPrice = () => {
    return TransactionsData.detailRoom.reduce(
      (pre, after) => pre.price + after.price,
      0
    );
  };
  const ArrayDataTransaction = {
    user: TransactionsData.user.FullName,
    hotel: TransactionsData.detailHotel,
    room: [...TransactionsData.detailRoom.numberRoom],
    dateStart: TransactionsData.date.startDate,
    dateEnd: TransactionsData.date.endDate,
    price: totalPrice(),
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
