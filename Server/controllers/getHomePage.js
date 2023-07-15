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
                    rate_text: element.rating > 8 ? "Excellent" : "Good",
                    photos: element.photos[0],
                    id: element.id,
                    idRoom: results[i]._id,
                    rooms: element.rooms,
                  });
                }
              });
            }
          }

          return res.json({
            results: ans,
            // test: results,
          });
          // }
          // return res.json("not found hotel");
        }
      });
      // .then((hasFilterPeople) => {
      //   // Lọc các phòng đã có người ở bằng cách so sánh ngày phòng được đặt, trong khoảng từ ngày đó đến ngày người ta ra ngoài thì phòng phải trống
      //   const isMatchDate = hasFilterPeople.filter(
      //     (rooms) =>
      //       new Date(rooms.createdAt).getDate() >
      //         new Date(timeClient[0].endDate).getDate() ||
      //       new Date(rooms.updatedAt).getDate() <
      //         console.log(new Date(timeClient[0].startDate).getDate())
      //   );
      //   if (!isMatchDate.length) {
      //     return res.json({ message: "run out of room", statusCode: 404 });
      //   }
      //   return res.json(isMatchDate);
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.detailHotel = (req, res, next) => {
  const idHotel = req.body.data.id;
  const convertId = new mongoose.Types.ObjectId(idHotel);
  console.log(idHotel);
  Hotel.findById(convertId)
    .then((hotel) => res.status(200).json(hotel))
    .catch((err) => {
      res.status(500).json("not found hotel");
      console.log(err);
    });
};

exports.reserveDetailHotel = (req, res, next) => {
  const TransactionsData = req.body.data; // fullname, email, phonenumber, cardnumber, date, informationDate, methodpayment
  // const convertId = new mongoose.Types.ObjectId(idHotel);
  // console.log(idHotel);
  const transactions = new Transactions({
    TransactionsData,
  });
  transactions
    .save()
    .then((results) => {
      console.log(results);
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

// for (let i = 0; i < hotelsSearch.length; i++) {
//   const element = hotelsSearch[i];
//   if (element.rooms) {
//     const test = element.rooms.filter((e) => e === element.id);
//     roomsSearch.push({
//       rooms: element.rooms,
//       name: element.name,
//       distance: element.distance,
//       tag: element.featured,
//       rating: element.rating,
//       photos: element.photos[0],
//       id: element.id,
//       rate_text: element.rating > 8 ? "exilent" : "good",
//       type: element.title,
//       description: element.description,
//       price: element.price,
//     });
//   }
// }
