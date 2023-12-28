import React from "react";
import "../components/css/addnew.css";
import Navigator from "../components/dashbroad/Navigator";

const AddnewRoom = () => {
  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <header className="heading">
          <h2 style={{ color: "rgb(141, 141, 141)" }}>Add New Rooms</h2>
        </header>
        <div>
          <h2 style={{ color: "rgb(255, 0, 0)", textAlign: "center" }}>
            {/* Hiển thị lỗi ở đây */}
          </h2>
        </div>
        <article className="form__input">
          <form action="" method="post">
            <div className="form__input--flex">
              <div>
                <label htmlFor="Name">Title</label> <br />
                <input
                  type="text"
                  placeholder="2 bed rooms"
                  id="Name"
                  value="<%= updated.title %>"
                  name="title"
                />
                <label htmlFor="Price">Price</label> <br />
                <input
                  type="text"
                  placeholder="100"
                  id="Price"
                  value="<%= updated.price %>"
                  name="price"
                />
              </div>
              <div>
                <label htmlFor="Description">Description</label> <br />
                <input
                  type="text"
                  placeholder="King size bed, 1 bathroom"
                  id="Description"
                  value="<%= updated.desc %>"
                  name="description"
                />
                <label htmlFor="Type">Max People</label> <br />
                <input
                  type="text"
                  placeholder="2"
                  id="Type"
                  value="<%= updated.maxPeople %>"
                  name="numberPeople"
                />
              </div>
            </div>
            <div className="foot__newrooms">
              <div>
                <label htmlFor="Rooms">Rooms</label>
                <textarea
                  style={{ width: "90%" }}
                  name="roomNumbers"
                  id="Rooms"
                  cols={30}
                  rows={10}
                  placeholder="give comma between room numbers"
                ></textarea>
              </div>
              <div className="foot__newrooms--align">
                <label htmlFor="hotel">Choose a hotel</label>
                <br />
                <select name="hotel" id="hotel">
                  <option value="<%= nameHotelUpdated %>"></option>
                </select>
                <br />
              </div>
              <div className="foot__newrooms--align">
                <button type="submit">Send</button>
              </div>
            </div>
          </form>
          {/* 
          <form action="/room-list/new-room" method="post">
            <div className="form__input--flex">
              <div>
                <label htmlFor="Name">Title</label> <br />
                <input
                  type="text"
                  placeholder="2 bed rooms"
                  id="Name"
                  name="title"
                />
                <label htmlFor="Price">Price</label> <br />
                <input type="text" placeholder="100" id="Price" name="price" />
              </div>
              <div>
                <label htmlFor="Description">Description</label> <br />
                <input
                  type="text"
                  placeholder="King size bed, 1 bathroom"
                  id="Description"
                  name="description"
                />
                <label htmlFor="Type">Max People</label> <br />
                <input
                  type="text"
                  placeholder="2"
                  id="Type"
                  name="numberPeople"
                />
              </div>
            </div>
            <div className="foot__newrooms">
              <div>
                <label htmlFor="Rooms">Rooms</label>
                <textarea
                  style={{ width: "90%" }}
                  name="roomNumbers"
                  id="Rooms"
                  cols={30}
                  rows={10}
                  placeholder="give comma between room numbers"
                ></textarea>
              </div>
              <div className="foot__newrooms--align">
                <label htmlFor="hotel">Choose a hotel</label>
                <br />
                <select name="hotel" id="hotel">
                  <option selected>Vui lòng chọn khách sạn</option>
                </select>
                <br />
              </div>
              <div className="foot__newrooms--align">
                <button type="submit">Send</button>
              </div>
            </div>
          </form>
          */}
        </article>
      </main>
    </>
  );
};

export default AddnewRoom;
