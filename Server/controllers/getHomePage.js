const Hotel = require("../model/hotel");

const Rooms = require("../model/room");

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
        // nameHotel: Datahotel[0].name,
        // cityHotel: Datahotel[0].city,
        // priceHotel: Datahotel[0].cheapestPrice,
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

  // res.status(201).json("Server has search!");

  Rooms.find()
    .then((resultRooms) => {
      Hotel.find({ city: location }).then((resultHotel) => {
        if (resultHotel) {
          // Lọc các phòng có số người phù hợp, nhưng những phòng này chưa rõ có người ở hay không
          let hotelsSearch = [];
          let roomsSearch = [];
          let results = [];
          let all = [];
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
                  hotelsSearch.push(resultHotel[i], iterator);
                  // roomsSearch.push(iterator);
                  results.push(iterator);
                  // const test = Object.assign(iterator, resultHotel[i]);
                  // const test = Object.assign(...resultHotel, iterator);
                  // hotelsSearch.push(iterator);
                }
              });
            }
          }
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

          for (let i = 0; i < results.length; i++) {
            const element = hotelsSearch[i];
            if (element.rooms) {
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
                    rate_text: element.rating > 8 ? "exilent" : "good",
                    photos: element.photos[0],
                    id: element.id,
                    rooms: element.rooms,
                  });
                }
              });
            }
          }

          // if (hotelsSearch.length > 1) {
          //   const testFilterHotel = hotelsSearch[0].map((e) => {
          //     return {
          //       idHotel: e.id,
          //       idRooms: e.rooms,
          //       name: e.name,
          //       distance: e.distance,
          //       tag: e.featured ? "taxi" : "no",
          //       free_cancel: e.featured,
          //       rating: e.rating,
          //       photos: e.photos[0],
          //     };
          //   });
          //   const testFilterRooms = roomsSearch.map((e) => {
          //     return {
          //       id: e.id,
          //       type: e.title,
          //       description: e.description,
          //       price: e.price,
          //       rate_text: e.rating > 8 ? "exilent" : "good",
          //     };
          //   });

          // for (let i = 0; i < hotelsSearch.length; i++) {
          //   const element = hotelsSearch[i];
          //   const test = roomsSearch.map((e) => {
          //     // if (e.id === element.rooms) {
          //     return {
          //       maxPeople: e.maxPeople,
          //       price: e.price,
          //       ...element,
          //     };
          //     // }
          //   });
          //   hotelsSearch = [...test];
          // }

          return res.json({
            // hotels: hotelsSearch,
            results: suitableRooms,
            // rooms: roomsSearch,
            // arraytest: test,
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

// res.json({
//   name: hotelsSearch[0].name,
//   distance: hotelsSearch[0].distance,
//   tag: hotelsSearch[0].featured ? "taxi" : "no",
//   free_cancel: hotelsSearch[0].featured,
//   rating: hotelsSearch[0].rating,
//   photos: hotelsSearch[0].photos[0],
//   type: roomsSearch.title,
//   description: roomsSearch.description,
//   price: roomsSearch.price,
//   rate_text: roomsSearch.rating > 8 ? "exilent" : "good",
// });

// const hotels = [
//   {
//     array: ["", "", ""],
//   },
//   {
//     array: ["", ""],
//   },
//   {
//     array: [""],
//   },
// ];

// const rooms = [{ 0: "" }, { 1: "" }, { 2: "" }];

// hotels.filter(e => e.array.find((ele) => ele === rooms[i] ))

// suitableRooms.filter((e) => {
//   // return ;
//   return hotelLocation.rooms.filter((ele) =>
//     suitableRooms.filter((e) => e._id === ele)
//     {
//       for (let i = 0; i < suitableRooms.length; i++) {
//         return suitableRooms[i]._id === ele;
//       }
//     }
//   );
//   });
