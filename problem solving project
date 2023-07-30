# Đây là những khó khăn khi mình làm bài tập và theo đó là cách mình fix lỗi và giải quyết vấn đề

Trong bài tập này mình đã gặp khó khăn với truy vấn thông tin hotel từ 2 model khác nhau và dữ liệu để nhận biết 2 mảng có liên kết với nhau hay không là hotel.rooms.id và roomDetail.id

RoomDetail và hotel đều là 2 mảng chứa nhiều object khác nhau

const RoomDetail = [
  {
      id: 3243214,
      price: 120.000,
      desc: "Có giường tình yêu và cách âm"
      width: "80m2",
      maxPeople: 4
  }
  {
      id: 3243215,
      price: 150.000,
      desc: "Có giường tình yêu và cách âm"
      width: "50m2",
      maxPeople: 2
  }
  {
      id: 3243216,
      price: 170.000,
      desc: "Phòng VIP"
      width: "60m2",
      maxPeople: 1
  }
  {
      id: 3243217,
      price: 170.000,
      desc: "Phòng VIP"
      width: "60m2",
      maxPeople: 1
  }
  {
      id: 3243218,
      price: 170.000,
      desc: "Phòng VIP"
      width: "60m2",
      maxPeople: 1
  }
]

const hotel = [
     {
       id: 32142341,
       name: "Royal",
       city: "Ha Noi",
       rooms: [
           3243216,
           3243215
       ],
       rating: 8,
     }
     {
       id: 32142341,
       name: "Hotel Daiwoo",
       city: "Ho Chi Minh",
       rooms: [
           3243215,
           3243218,
           3243214
       ],
       rating: 10,
     }
 ]

## Solustion phần 2:
**Hôm nay khi làm dự án thì mình có gặp trường hợp phải lọc các dữ liệu ở gửi về nếu trùng ngày với lịch của phòng khác ( Tức là phòng đã đặt )**
Mình đã có thể trả về một object hoàn hảo nếu phải lấy từ nhiều model khác nhau, và lấy đúng dữ liệu mình cần
Cấu trúc là dùng vòng lặp for, câu điều kiện if, mảng mới, sau đó spread operator dữ liệu mình cần vào mảng
