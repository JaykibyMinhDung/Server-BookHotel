import React, { useEffect } from "react";

import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { format } from "date-fns";
import { useForm } from "react-hook-form";

import "./book.css";
import axios from "axios";

const BookHotel = ({ detailRoom, hotel }) => {
  const { register, handleSubmit, getValues } = useForm()
  const [totalBill, setTotalBill] = useState(0)
  const [date, setDate] = useState(
    [{
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    }]
  );
  const totalRoom = []
  const rangeDateBooking = date[0].endDate.getDate() - date[0].startDate.getDate() || 1
  const handleChange = (event, data) => {
    if (
      event.target.checked
    ) {
      // console.log(getValues("NumberRooms"))
      totalRoom.push(data)
      setTotalBill((totalBill + data.price * (date[0].endDate.getDate() - date[0].startDate.getDate() || 1)))
    } else {
      totalRoom.pop()
      setTotalBill((totalBill - data.price * (date[0].endDate.getDate() - date[0].startDate.getDate() || 1)))
    }
  }

  // const caculatorBill = 


  const onSubmit = (data) => {
    // event.preventDefault()
    // axios.post("http://localhost:5000/detailhotel/reserve",)
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
        <form onSubmit={ handleSubmit(onSubmit) } >
          <div className="form__bookhotel">
            {/* action="" method="post" */ }
            <div className="">
              <h3>Dates</h3>
              <DateRange
                editableDateInputs={ true }
                onChange={ (item) => setDate([item.selection]) }
                moveRangeOnFirstSelection={ false }
                ranges={ date }
                className="datebook"
                minDate={ new Date() }
              />
            </div>
            <div className="form__bookhotel--booking">
              <h3>Reverve Infor</h3>
              <label htmlFor="">Your Full Name:</label>
              <input { ...register("FullName") } type="text" placeholder="Full Name" id="" />
              <br />
              <label htmlFor="">Your Email:</label>
              <input { ...register("Email") } type="text" placeholder="Email" id="" />
              <br />
              <label htmlFor="">Your Phone Number:</label>
              <input { ...register("PhoneNumber") } type="text" placeholder="Phone Number" id="" />
              <br />
              <label htmlFor="">Your Identity Card Number:</label>
              <input { ...register("CardNumber") } type="text" placeholder="Card Number " id="" />
              {/* <input type="submit" value="test" /> */ }

            </div>
          </div>
          {/* in số phòng từ khách sạn */ }
          <h3>Select Rooms</h3>
          <div className="form__chooseroom">
            { detailRoom.map((e) => (
              <div key={ e.idRooms }>
                <div className="form_chooseroom--option">
                  <div>
                    <h4>{ e.typeRoom }</h4>
                    <p style={ { color: "gray" } }>{ e.description }</p>
                    <p style={ { fontSize: "small" } }>
                      max people: <strong>{ e.maxPeople }</strong>
                    </p>
                    <p>
                      $<b>{ e.price }</b>
                    </p>
                  </div>
                  <div className="form_chooseroom--numberRooms">
                    { e.numberRooms.map((number) => (
                      <div>
                        <label htmlFor={ number }>{ number }</label>
                        <input
                          { ...register("NumberRooms") }
                          type="checkbox"
                          onChange={ (event) => handleChange(event, { id: e.idRooms, numberRoom: number, price: e.price }) }
                          id={ number }
                        />
                      </div>
                    )) }
                  </div>
                </div>
                <hr />
              </div>
            )) }
          </div>
          <div className="form__payment">
            <div>
              <h2>
                Total Bill: $
                { totalBill }
              </h2>
              <select style={ { marginTop: "0.5rem" } } { ...register("payment") }>
                <option value="auto">Select Payment Method</option>
                {/* bắt buộc chọn 1 trong 2 phương bên dưới  */ }
                <option value="cash">Thanh toán tại quầy</option>
                <option value="card">Thanh toán bằng thẻ</option>
              </select>
            </div>
            <div>
              <button type="submit">Reserve Now</button>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment >
  );
};

export default BookHotel;
