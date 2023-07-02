import React from "react";

import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

import "./book.css";

const BookHotel = () => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  return (
    <React.Fragment>
      <main>
        <div className="form__bookhotel">
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
            <form action="" method="post">
              <h3>Reverve Infor</h3>
              <label htmlFor="">Your Full Name:</label>
              <input type="text" name="" placeholder="Full Name" id="" />
              <br />
              <label htmlFor="">Your Email:</label>
              <input type="text" name="" placeholder="Email" id="" />
              <br />
              <label htmlFor="">Your Phone Number:</label>
              <input type="text" name="" placeholder="Phone Number" id="" />
              <br />
              <label htmlFor="">Your Identity Card Number:</label>
              <input type="text" name="" placeholder="Card Number " id="" />
            </form>
          </div>
        </div>
        <div className="form__chooseroom">
          <div>
            <h3>Select Rooms</h3>
            <div className="form_chooseroom--option">
              <div>
                <p>Budget Double Rooms</p>
                <p>Pay Nothing until September 04, 2022</p>
                <p>max people: 2</p>
                <p>$350</p>
              </div>
              <div className="form_chooseroom--numberRooms">
                <div>
                  <label htmlFor="">101</label>
                  <input type="checkbox" name="101" id="" />
                </div>
                <div>
                  <label htmlFor="">201</label>
                  <input type="checkbox" name="" id="" />
                </div>
                <div>
                  <label htmlFor="">202</label>
                  <input type="checkbox" name="" id="" />
                </div>
                <div>
                  <label htmlFor="">301</label>
                  <input type="checkbox" name="" id="" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h3>Select Rooms</h3>
              <div className="form_chooseroom--option">
                <div>
                  <p>Budget Twin Rooms</p>
                  <p>Free cancellation before September 06, 2022</p>
                  <p>max people: 2</p>
                  <p>$350</p>
                </div>
                <div className="form_chooseroom--numberRooms">
                  <div>
                    <label htmlFor="">101</label>
                    <input type="checkbox" name="101" id="" />
                  </div>
                  <div>
                    <label htmlFor="">201</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div>
                    <label htmlFor="">202</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div>
                    <label htmlFor="">301</label>
                    <input type="checkbox" name="" id="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form__payment">
          <div>
            <h2>Total Bill: {"$700"}</h2>
            <select style={{ marginTop: "0.5rem" }} name="" id="">
              <option value="Payment">Select Payment Method</option>
              <option value="Payment">Select Payment Method</option>
              <option value="Payment">Select Payment Method</option>
            </select>
          </div>
          <div>
            <button>Reserve Now</button>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default BookHotel;
