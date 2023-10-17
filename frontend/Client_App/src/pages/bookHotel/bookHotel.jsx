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

const BookHotel = ({ detailRoom, hotel, dateProps, newDate }) => {
  const dataUserLocal = JSON.parse(localStorage.getItem('User'));
  let flag = false;
  const User = JSON.parse(localStorage.getItem("User"));
  const { register, handleSubmit } = useForm({
    defaultValues: {
      FullName: "Minh Dũng",
      Email: User[0].emailUser,
      PhoneNumber: "0945758347",
    },
  });
  const [valueRoom, setvalueRoom] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [chooseRoom, setChooseRoom] = useState({});
  const [date, setDate] = useState([
    {
      startDate: dateProps[0].startDate, // .toLocaleDateString("es-CL")
      endDate: dateProps[0].endDate,
      key: "selection",
    },
  ]);
  const start = date[0].startDate;
  const end = date[0].endDate;

  const rangeDateBooking = () => {
    if (start && end) {
      return date[0].endDate.getDate() - date[0].startDate.getDate();
    }
  };

  const handleChange = (data) => {
    setChooseRoom({ ...data });
  };

  const caculatorBill = (room) => {
    for (let i = 0; i < room.length; i++) {
      const element = room[i];
      return flag
        ? setTotalBill(
            totalBill + element?.price * (end.getDate() - start.getDate())
          )
        : setTotalBill(
            totalBill - element?.price * (end.getDate() - start.getDate())
          );
    }
  };

  console.log(valueRoom);
  const handleChangeRooms = (rooms) => {
    if (rangeDateBooking() < 1) {
      return toast.error("Bạn cần đăng kí lớn hơn 2 ngày trước khi đặt phòng.");
    }
    flag = rooms?.isCheck;
    caculatorBill(valueRoom);
    if (rooms.isCheck && rangeDateBooking() > 1) {
      setvalueRoom([...valueRoom, rooms.informationRoom]);
      return caculatorBill([...valueRoom, rooms.informationRoom]);
    } 
    if (
      !rooms.isCheck &&
      rangeDateBooking() > 1
    ) {
      const indexRoom = valueRoom.findIndex(
        (room) =>
          room?.id === rooms?.informationRoom.id &&
          room?.numberRoom === rooms?.informationRoom.numberRoom
      )
      const test = valueRoom.splice(indexRoom, 1)
    }
  };

  // Lỗi handle là do trong hàm này đang xử lý thêm giá cả
  const onSubmit = (data) => {
    if (rangeDateBooking() < 1) {
      return toast.error("Giao dịch không thành công do chưa đặt ngày");
    }
    data.id = dataUserLocal.length > 0 ? dataUserLocal[0].userId : '';
    axios.post("http://localhost:5000/detailhotel/reserve", {
      user: data,
      date: {
        startDate: date[0].startDate, // .toLocaleDateString("es-US")
        endDate: date[0].endDate, // .toLocaleDateString("es-US")
        key: "selection",
      },
      detailHotel: hotel._id,
      detailRoom: valueRoom,
      totalPrice: totalBill
    }).then((res) => toast(res.message))    
  };

  useEffect(() => {
    handleChangeRooms(chooseRoom);
  }, [chooseRoom]);

  if (!detailRoom) {
    return <div>Không có phòng nào cả</div>;
  }
  return (
    <React.Fragment>
      <main>
        <Toaster />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__bookhotel">
            {/* action="" method="post" */}
            <div className="">
              <h3>Dates</h3>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {setDate([item.selection]); newDate([item.selection])}}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="datebook"
                minDate={new Date()}
              />
            </div>
            <div className="form__bookhotel--booking">
              <h3>Reverve Infor</h3>
              <label htmlFor="">Your Full Name:</label>
              <input
                {...register("FullName")}
                type="text"
                placeholder="Full Name"
                id=""
              />
              <br />
              <label htmlFor="">Your Email:</label>
              <input
                {...register("Email")}
                type="text"
                placeholder="Email"
                id=""
              />
              <br />
              <label htmlFor="">Your Phone Number:</label>
              <input
                {...register("PhoneNumber")}
                type="text"
                placeholder="Phone Number"
                id=""
              />
              <br />
              <label htmlFor="">Your Identity Card Number:</label>
              <input
                {...register("CardNumber")}
                type="text"
                placeholder="Card Number "
                id=""
              />
              {/* <input type="submit" value="test" /> */}
            </div>
          </div>
          {/* in số phòng từ khách sạn */}
          <h3>Select Rooms</h3>
          {detailRoom.length === 0 && "Hiện tại khách sạn đã hết phòng!"}
          <div className="form__chooseroom">
            {detailRoom.map((e, index) => (
              <div key={index}>
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
                    {e.numberRooms.map((number, index) => (
                      <div key={index}>
                        <label htmlFor={number}>{number}</label>
                        <input
                          // {...register("NumberRooms")}
                          name="checkbox"
                          type="checkbox"
                          onChange={(event) =>
                            handleChange({
                              isCheck: event.target.checked,
                              informationRoom: {
                                id: e.idRooms,
                                numberRoom: number,
                                price: e.price,
                              },
                            })
                          }
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
              <h2>Total Bill: ${totalBill}</h2>
              <select
                onChange={caculatorBill}
                style={{ marginTop: "0.5rem" }}
                {...register("payment")}
              >
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
    </React.Fragment>
  );
};

export default BookHotel;
