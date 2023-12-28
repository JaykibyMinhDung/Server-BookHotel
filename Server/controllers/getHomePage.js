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
          message: "Không tìm thấy khách sạn",
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
            a.sort();
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
                  if (!hasbooked) {
                    return ArrayDetailRooms.push(informationRoom);
                  }
                }
              }
            };
            for (const element of roomsSearch) {
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

// Trả về chi tiết khách sạn sau khi tìm kiếm, 2 lần chỉnh phòng theo date, 1 lần là chỉnh theo giá trị chọn ban đầu, 2 là chỉnh theo giá trị khi người dùng không có phòng nào ưng ý

exports.detailHotel = (req, res, next) => {
  const idHotel = req.query.id;
  const start_date = new Date(req.query.start_date).toISOString();
  const end_date = new Date(req.query.end_date).toISOString();

  Hotel.findById(idHotel)
    .then((hotel) => {
      Transactions.find(
        //   {
        //   $and: [
        //     { dateStart: { $gte: start_date } },
        //     { dateEnd: { $lte: end_date } },
        //   ],
        // }
        {
          $or: [
            // {
            //   $and: [
            //     {
            //       dateStart: {
            //         $gt: new Date(start_date),
            //       },
            //     },
            //     {
            //       dateEnd: {
            //         $gt: new Date(start_date),
            //         $lt: new Date(end_date),
            //       },
            //     },
            //   ],
            // },
            {
              $and: [
                {
                  dateStart: {
                    $lt: new Date(start_date),
                  },
                },
                {
                  dateEnd: {
                    $gt: new Date(start_date),
                    $lt: new Date(end_date),
                  },
                },
              ],
            },
            {
              $and: [
                {
                  dateStart: {
                    $lt: new Date(start_date),
                  },
                },
                {
                  dateEnd: {
                    $gt: new Date(end_date),
                  },
                },
              ],
            },
            {
              $and: [
                {
                  dateStart: {
                    $gt: new Date(start_date),
                    $lt: new Date(end_date),
                  },
                },
                {
                  dateEnd: {
                    $lt: new Date(end_date),
                  },
                },
              ],
            },
            {
              $and: [
                {
                  dateStart: {
                    $gt: new Date(start_date),
                    $lt: new Date(end_date),
                  },
                },
                {
                  dateEnd: {
                    $gt: new Date(end_date),
                  },
                },
              ],
            },
          ],
          hotel: idHotel,
        }
      ).then((hasTransaction) => {
        const arrIdHasBookRoom = []; // Mảng chứa phòng đã đặt
        const ArrRoom = []; // Mảng chứa thông tin tùy chỉnh (frontend cần gì chả nấy) sau khi lọc các phòng đã đặt
        for (const booked of hasTransaction) {
          const hasBookRoom = booked.room;
          for (const inforRoom of hasBookRoom) {
            arrIdHasBookRoom.push(inforRoom);
          }
        }
        Rooms.find()
          .then((room) => {
            function updatedRoomHandle(detailRoom) {
              const hasExist = ArrRoom.findIndex(
                (e) => e.idRooms === detailRoom.id
              );
              // console.log("Index đã tồn tại", ArrRoom);
              if (hasExist === -1) {
                return ArrRoom.push({
                  idRooms: detailRoom.id,
                  numberRooms: detailRoom.roomNumbers,
                  maxPeople: detailRoom.maxPeople,
                  typeRoom: detailRoom.title,
                  description: detailRoom.desc,
                  price: detailRoom.price,
                });
              }
            }
            function deleteRoomNumbersHotelDetail(detailRoom, roomOther) {
              // const indexHasBooked = arrIdHasBookRoom.findIndex(
              //   (e) => e.id === detailRoom.id
              // );
              // arrIdHasBookRoom
              //   .sort((a, b) => a.id - b.id)
              //   .splice(indexHasBooked, 1);
              const testIndex = detailRoom.roomNumbers.findIndex(
                (e) => e === roomOther.numberRoom
              );
              if (roomOther.id === detailRoom.id) {
                detailRoom.roomNumbers.splice(testIndex, 1);
                // detailRoom.roomNumbers.splice(indexHasBooked, 1);
                // console.log(
                //   "Index ở trong number để nó xóa đúng",
                //   testIndex,
                //   roomOther.numberRoom,
                //   detailRoom.roomNumbers
                // );
              }
            }
            for (const detailRoom of room) {
              arrIdHasBookRoom.map((e) => {
                const roomOther = hotel.rooms.findIndex((r) => r === e.id);
                deleteRoomNumbersHotelDetail(detailRoom, e); // roomOther
                if (e.id === detailRoom.id) {
                  if (roomOther !== -1) {
                    updatedRoomHandle(detailRoom);
                  }
                }
              });
              // Tất cả các phòng của khách sạn này
              hotel.rooms.map((e) => {
                if (e === detailRoom.id) {
                  // Không có phòng nào đặt sẽ trả về tất cả các phòng của khách sạn
                  const existRoom = arrIdHasBookRoom.find(
                    (exist) => exist.id === detailRoom.id
                  );
                  if (!existRoom) {
                    return ArrRoom.push({
                      idRooms: detailRoom.id,
                      numberRooms: detailRoom.roomNumbers,
                      maxPeople: detailRoom.maxPeople,
                      typeRoom: detailRoom.title,
                      description: detailRoom.desc,
                      price: detailRoom.price,
                    });
                  }
                }
              });
            }
          })
          .then(() => {
            function onlyUnique(value, index, array) {
              if (array.indexOf(value) !== index) {
                ArrRoom.splice(index, 1);
              }
              return array.indexOf(value) === index;
            }
            ArrRoom.map((e) => e.idRooms).filter(onlyUnique);
            const ArrResults = {
              informationHotel: { ...hotel._doc },
              informationRoom: ArrRoom,
            };
            return res.json({
              statusCode: 1,
              message: "Giao dịch thành công",
              RecordInformationRoom: ArrRoom.length,
              ArrResults: ArrResults,
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Không tìm thấy thông tin chi tiết hotel",
        statusCode: 0,
      });
      console.log(err);
    });
};

// Booked phòng
exports.reserveDetailHotel = (req, res, next) => {
  const TransactionsData = req.body; // fullname, email, phonenumber, cardnumber, date, informationDate, methodpayment
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
  console.log(TransactionsData);
  const ArrayDataTransaction = {
    user: TransactionsData.user.Email,
    user_id: TransactionsData.user.id,
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

// Hiển thị giao dịch đặt phòng
exports.transactionHotel = (req, res, next) => {
  const user_id = req.query.userId;
  const username = req.query.username;
  // console.log(user_id, username)
  // Lấy name hotel
  Transactions.find({
    $or: [
      {
        user_id: user_id ? user_id : { $exists: false },
        user: username,
      },
    ],
  })
    .then((DataTransactionHotel) => {
      if (!DataTransactionHotel) {
        return res.json({
          statusCode: 500,
          message: "Chưa có giao dịch của người dùng này",
        });
      }
      const arrNameHotel = [];
      Hotel.find()
        .then((e) => {
          // console.log(DataTransactionHotel.hotel);
          for (let i = 0; i < DataTransactionHotel.length; i++) {
            const element = DataTransactionHotel[i];
            // const convertId = new mongoose.Types.ObjectId(element.hotel);
            const filterNameHotel = e.find(
              (data) => data._id.toString() === element.hotel
            );
            if (filterNameHotel) {
              arrNameHotel.push(filterNameHotel.name);
              element.nameHotel = filterNameHotel.name;
            }
          }
          return DataTransactionHotel;
        })
        .then((e) => {
          return res.status(200).json({
            statusCode: 200,
            message: "Tìm dữ liệu thành công",
            Transactions: [...e],
            nameHotel: arrNameHotel,
            recordTransaction: e.length,
          });
        });
    })
    .catch((err) => {
      console.log("getRatingHotel" + err);
      res.status(400).json({
        status: 200,
        message: "Không tìm thấy dữ liệu về giao dịch",
      });
    });
};
