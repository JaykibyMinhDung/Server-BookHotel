import React from "react";
import Navigator from "../components/dashbroad/Navigator";

const AddnewHotel = () => {
  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <header className="heading">
          <h2 style={{ color: "rgb(141, 141, 141)" }}>Add New Hotel</h2>
        </header>
        {/* Hiển thị lỗi sai ở đây */}
        <article className="form__input">
          <form
            action="/hotellist/updated/<%= updated._id %>"
            method="post"
            encType="multipart/form-data"
          >
            <div className="form__input--flex">
              <div>
                <label htmlFor="Name">Name</label> <br />
                <input
                  type="text"
                  value="<%= updated.name %>"
                  placeholder="My Hotel"
                  id="Name"
                  name="Name"
                />
                <label htmlFor="City">City</label> <br />
                <input
                  type="text"
                  value="<%= updated.city %>"
                  placeholder="New York"
                  id="City"
                  name="City"
                />
                <label htmlFor="far">Distance from city center</label> <br />
                <input
                  type="text"
                  value="<%= updated.distance %>"
                  placeholder="500"
                  id="far"
                  name="far"
                />
                <label htmlFor="Description">Description</label> <br />
                <input
                  type="text"
                  value="<%= updated.desc %>"
                  placeholder="Description"
                  id="Description"
                  name="Description"
                />
                <label htmlFor="Images">Images</label> <br />
                <input
                  type="file"
                  // value="<%= updated.photos %>"
                  placeholder="Images"
                  id="Images"
                  name="Images"
                  multiple
                />
              </div>
              <div>
                <label htmlFor="Type">Type</label> <br />
                <input
                  type="text"
                  value="<%= updated.type %>"
                  placeholder="hotel"
                  id="Type"
                  name="Type"
                />
                <label htmlFor="Address">Address</label> <br />
                <input
                  type="text"
                  value="<%= updated.address %>"
                  placeholder="elton st, 216"
                  id="Address"
                  name="Address"
                />
                <label htmlFor="Title">Title</label> <br />
                <input
                  type="text"
                  value="<%= updated.title %>"
                  placeholder="The best hotel"
                  id="Title"
                  name="Title"
                />
                <label htmlFor="Price">Price</label> <br />
                <input
                  type="text"
                  value="<%= updated.cheapestPrice %>"
                  placeholder="100"
                  id="Price"
                  name="Price"
                />
                <label htmlFor="Feature">Feature</label> <br />
                <select name="Feature" id="Feature">
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </select>
              </div>
            </div>
            <label htmlFor="Rooms">Rooms</label>
            <textarea name="Rooms" id="Rooms" cols={30} rows={5}></textarea>
            <br />
            <button type="submit">Send</button>
            <input type="submit" value="Send" />
            {/* có dòng enctype="multipart/form-data" này để tạo dữ liệu binary cho file ảnh %> */}
          </form>
          {/*                 
                  <form action="/hotellist/newhotel" method="post" enctype="multipart/form-data">
                    <div className="form__input--flex">
                      <div>
                        <label for="Name">Name</label> <br />
                        <input type="text" placeholder="My Hotel" id="Name" name="Name">
                        <label for="City">City</label> <br />
                        <input type="text" placeholder="New York" id="City" name="City">
                        <label for="far">Distance from city center</label> <br />
                        <input type="text" placeholder="500" id="far" name="far">
                        <label for="Description">Description</label> <br />
                        <input type="text" placeholder="Description" id="Description" name="Description">
                        <label for="Images">Images</label> <br />
                        <input type="file" placeholder="Images" id="Images" name="Images" multiple>
                      </div>
                      <div>
                        <label for="Type">Type</label> <br />
                        <input type="text" placeholder="hotel" id="Type" name="Type">
                        <label for="Address">Address</label> <br />
                        <input type="text" placeholder="elton st, 216" id="Address" name="Address">
                        <label for="Title">Title</label> <br />
                        <input type="text" placeholder="The best hotel" id="Title" name="Title">
                        <label for="Price">Price</label> <br />
                        <input type="text" placeholder="100" id="Price" name="Price">
                        <label for="Feature">Feature</label> <br />
                        <select name="Feature" id="Feature">
                          <option value="yes">yes</option>
                          <option value="no">no</option>
                        </select>
                      </div>
                    </div>
                    <label for="Rooms">Rooms</label>
                    <textarea 
                    name="Rooms" 
                    placeholder="
                    2 Bed Rooms,
                    1 Bed Rooms,
                    Basement Double Room,
                    Superior basement room,
                    Deliver rooms" 
                    id="Rooms" 
                    cols="30" 
                    rows="5"
                    value=""></textarea>
                    <br />
                    <button type="submit">Send</button>
                    <%# <input type="submit" value="Send"> %>
                  </form> */}
        </article>
      </main>
    </>
  );
};

export default AddnewHotel;
