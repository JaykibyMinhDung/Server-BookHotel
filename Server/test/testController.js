exports.detailHotel = (req, res, next) => {
  // const idHotel = req.body.data.id;
  const idHotel = req.query.id;
  const start_date = new Date(req.query.start_date).toISOString();
  const end_date = new Date(req.query.end_date).toISOString();
  // const convertId = new mongoose.Types.ObjectId(idHotel);
  if (!idHotel) {
    return res.json({
      statusCode: 500,
      message: "Chưa có thông tin người dùng, vui lòng reload lại trang",
    });
  }
  Hotel.findById(idHotel)
    .then((hotel) => {
      if (!hotel) {
        return res.status(200).json({
          statusCode: 0,
          message: "Không tìm thấy thông tin chi tiết hotel",
        });
      }
      Rooms.find().then((room) => {
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
        }).then((transactions) => {
          const ArrRoom = [];
          const filterRooms = (AllRoomHotelTransaction, informationRoom) => {
            // Lấy từng giao dịch trong transaction ra
            for (let i = 0; i < room.length; i++) {
              // Lấy id phòng đã booked so sánh với tất cả các phòng trong khách sạn
              const detailTransaction = transactions[i];
              // Chặn các phần tử detailTransaction undefined
              if (detailTransaction) {
                const hasbooked = detailTransaction.room.find(
                  (e) => e.id === AllRoomHotelTransaction.toString()
                  // (e) =>
                  //   console.log(e.id === AllRoomHotelTransaction.toString())
                );
                console.log(hasbooked);
                if (!hasbooked) {
                  console.log("Khong trung");
                  return ArrRoom.push({
                    idRooms: informationRoom.id,
                    numberRooms: informationRoom.roomNumbers,
                    maxPeople: informationRoom.maxPeople,
                    typeRoom: informationRoom.title,
                    description: informationRoom.desc,
                    price: informationRoom.price,
                  });
                } else {
                  console.log("trung");
                }
              } else {
                console.log("Khong co giao dich");
                return ArrRoom.push({
                  idRooms: informationRoom.id,
                  numberRooms: informationRoom.roomNumbers,
                  maxPeople: informationRoom.maxPeople,
                  typeRoom: informationRoom.title,
                  description: informationRoom.desc,
                  price: informationRoom.price,
                });
              }
            }
          };
          for (let i = 0; i < hotel.rooms.length; i++) {
            const element = hotel.rooms[i]; // id các phòng của model khách sạn
            room.map((e) => {
              if (element === e.id) {
                filterRooms(e.id, e);
              }
            });
          }
          const ArrResults = {
            informationHotel: { ...hotel._doc },
            informationRoom: ArrRoom,
          };
          res.status(200).json({
            statusCode: 200,
            message: "Nhận dữ liệu thành công",
            RecordInformationRoom: ArrRoom.length,
            ArrResults: ArrResults,
          });
          // console.log(ArrRoom);
        });
      });
    })
    .catch((err) => {
      res.status(500).json("Không tìm thấy thông tin chi tiết hotel");
      console.log(err);
    });
};
