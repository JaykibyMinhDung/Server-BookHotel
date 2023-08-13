import React, { useEffect } from "react";

import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { format } from "date-fns";
import { useForm } from "react-hook-form";

import "./book.css";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const BookHotel = ({ detailRoom, hotel }) => {
  const User = JSON.parse(localStorage.getItem("User"))
  const { register, handleSubmit } = useForm({
    defaultValues: {
      FullName: "Minh Dũng",
      Email: User[0].emailUser,
      PhoneNumber: "0945758347",
  }
  })
  const [totalBill, setTotalBill] = useState(0)
  // const [valueRoom, setvalueRoom] = useState("")
  const [date, setDate] = useState(
    [{
      startDate: new Date(), // 2  biến này đang là null để valid dữ liệu đầu vào
      endDate: new Date(),
      key: "selection", // 
    }]
  );

  const totalRoom = [];
  const start = date[0].startDate;
  const end = date[0].endDate;

  const rangeDateBooking = () => {
    if (start && end) {
      return date[0].endDate.getDate() - date[0].startDate.getDate()
    }
  };

  const handleChange = (data) => {
    // e.predefault()
  if (rangeDateBooking() < 1) {
    return toast.error("Bạn cần đăng kí lớn hơn 2 ngày trước khi đặt phòng.")
  }
  if (data.isCheck && rangeDateBooking() > 1) {
      // console.log(getValues("NumberRooms"))
      // setTotalBill((totalBill + data.informationRoom.price * (end.getDate() - start.getDate() || 1)))
      totalRoom.push(data.informationRoom)
    } else if (!data.isCheck && rangeDateBooking() > 1) {
      // setTotalBill((totalBill - data.informationRoom.price * (end.getDate() - start.getDate() || 1)))
      totalRoom.pop()
    }
  };

  // Lỗi handle là do trong hàm này đang xử lý thêm giá cả
  // const handleChange = (data) => {
  //   if (data.isCheck && rangeDateBooking() > 1) {
  //     // console.log(getValues("NumberRooms"))
  //     // setTotalBill((totalBill + data.informationRoom.price * (end.getDate() - start.getDate() || 1)))
  //     totalRoom.push(data)
  //   }
  //   else if (!data.isCheck && rangeDateBooking() > 1) {
  //     // setTotalBill((totalBill - data.informationRoom.price * (end.getDate() - start.getDate() || 1)))
  //     totalRoom.pop()
  //   }
  // };

  // const caculatorBill = 

  const onSubmit = (data) => {
    // Người dùng sẽ cần bắt buộc chọn ngày nhận và trả phòng dự kiến. Sau khi chọn ở phần DatePicker thì bạn sẽ lọc các Room trống trong thời gian phù hợp đó và hiển thị bên dưới form như ảnh trên.

    // event.preventDefault()
    // axios.post("http://localhost:5000/detailhotel/reserve",)
    if (rangeDateBooking() < 1) {
      return toast.error("Giao dịch không thành công do chưa đặt ngày")
    }
    console.log(
      {
        user: data,
        date: {
          startDate: date[0].startDate.toLocaleDateString("es-CL"),
          endDate: date[0].endDate.toLocaleDateString("es-CL"),
          key: "selection",
        },
        detailHotel: hotel._id,
        detailRoom: totalRoom
      }
    )

  }
  // useEffect(() => {
  //   caculatorBill(totalRoom)
  // }, [totalRoom])
  if (!detailRoom) {
    return <div>Không có phòng nào cả</div>;
  }
  return (
    <React.Fragment>
      <main>
        <Toaster />
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="form__bookhotel">
            {/* action="" method="post" */}
            <div className="">
              <h3>Dates</h3>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="datebook"
                minDate={new Date()}
              />
            </div>
            <div className="form__bookhotel--booking">
              <h3>Reverve Infor</h3>
              <label htmlFor="">Your Full Name:</label>
              <input {...register("FullName")} type="text" placeholder="Full Name" id="" />
              <br />
              <label htmlFor="">Your Email:</label>
              <input {...register("Email")} type="text" placeholder="Email" id="" />
              <br />
              <label htmlFor="">Your Phone Number:</label>
              <input {...register("PhoneNumber")} type="text" placeholder="Phone Number" id="" />
              <br />
              <label htmlFor="">Your Identity Card Number:</label>
              <input {...register("CardNumber")} type="text" placeholder="Card Number " id="" />
              {/* <input type="submit" value="test" /> */}

            </div>
          </div>
          {/* in số phòng từ khách sạn */}
          <h3>Select Rooms</h3>
          <div className="form__chooseroom">
            {detailRoom.map((e) => (
              <div key={e.idRooms}>
                <div className="form_chooseroom--option">
                  <div>
                    <h4>{e.typeRoom}</h4>
                    <p style={{ color: "gray" }}>{e.description}</p>
                    <p style={{ fontSize: "small" }}>
                      max people: <strong>{e.maxPeople}</strong>
                    </p>
                    <p>
                      $<b>{e.price}</b>
                    </p>
                  </div>
                  <div className="form_chooseroom--numberRooms">
                    {e.numberRooms.map((number) => (
                      <div>
                        <label htmlFor={number}>{number}</label>
                        <input
                          // {...register("NumberRooms")}
                          name="checkbox"
                          type="checkbox"
                          onChange={event => handleChange(
                            {
                              isCheck: event.target.checked,
                              informationRoom: {
                                id: e.idRooms, numberRoom: number, price: e.price
                              }
                            })}
                          id={number}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="form__payment">
            <div>
              <h2>
                Total Bill: $
                {totalBill}
              </h2>
              <select style={{ marginTop: "0.5rem" }} {...register("payment")}>
                <option value="auto">Select Payment Method</option>
                {/* bắt buộc chọn 1 trong 2 phương bên dưới  */}
                <option value="cash">Thanh toán tại quầy</option>
                <option value="card">Thanh toán bằng thẻ</option>
              </select>
            </div>
            <div>
              {/* onKeyDown={handleSubmit(onSubmit)} */}
              <button type="submit">Reserve Now</button>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment >
  );
};

export default BookHotel;
