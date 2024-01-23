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
  // const dataUserLocal = JSON.parse(localStorage.getItem('User'));
  let flag = false;
  const User = JSON.parse(localStorage.getItem("User"));
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      FullName: User[0]?.fullname,
      Email: User[0].emailUser,
      PhoneNumber: User[0]?.numberphone,
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

  // console.log(valueRoom);
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
      valueRoom.splice(indexRoom, 1)
    }
  };

  // console.log(errors);
  const onSubmit = (data) => {
    const empty = Object.values(errors)
    if (empty.length) {
      return toast.error("Giá trị không được để trống")
    }
    if (valueRoom.length === 0) {
      return toast.error("Vui lòng chọn phòng")
    }
    if (data.payment === "auto") {
      return toast.error("Vui lòng chọn phương thức thanh toán")
    }
    console.log(valueRoom.length)
    if (rangeDateBooking() < 1) {
      return toast.error("Giao dịch không thành công do chưa đặt ngày");
    }
    data.id = User.length > 0 ? User[0].userId : '';
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
    }).then((res) => {
      // console.log(res);
      toast(res.data.message)
    }).catch(err => console.error(err))    
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
                {...register("FullName", { required: true })}
                type="text"
                placeholder="Full Name"
                id=""
              />
              {errors.FullName?.type === 'required' && <p style={{color: "red"}} role="alert">Tên không được để trống</p>}
              <br />
              <label htmlFor="">Your Email:</label>
              <input
                {...register("Email", { required: {value: true, message: 'Email không được để trống'}, pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Email chưa đúng định dạng',
              }, })}
                type="text"
                placeholder="Email"
                id=""
              />
              {errors.Email?.type === 'required' && <p style={{color: "red"}} role="alert">{errors.Email?.message}</p>}
              {errors.Email?.type === 'pattern' && <p style={{color: "red"}} role="alert">{errors.Email?.message}</p>}
              <br />
              <label htmlFor="">Your Phone Number:</label>
              <input
                {...register("PhoneNumber", { required: true })}
                type="text"
                placeholder="Phone Number"
                id=""
              />
              {errors.PhoneNumber?.type === 'required' && <p style={{color: "red"}} role="alert">Số điện thoại không được để trống</p>}
              <br />
              <label htmlFor="">Your Identity Card Number:</label>
              <input
                {...register("CardNumber", { required: true })}
                type="text"
                placeholder="Card Number "
                id=""
              />
              {errors.CardNumber?.type === 'required' && <p style={{color: "red"}} role="alert">Tài khoản ngân hàng không được để trống</p>}
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
