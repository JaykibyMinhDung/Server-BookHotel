import React, { useEffect, useState } from "react";
import Table from "../components/table/Table";
import Navigator from "../components/dashbroad/Navigator";
import { Managers } from "../apis/Managers";

const HotelList = () => {
  const [dataHotels, setdataHotels] = useState([]);

  const navigationNewHotelHandle = () => {};
  const titleHead = ["ID", "Name", "Type", "Title", "City", "Action", "Edit"];
  useEffect(() => {
    Managers()
      .getHotelsList()
      .then((res) => setdataHotels(res.ListHotel))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <Navigator />
      <div className="main__dashbroad">
        <article>
          <div className="headerHotel__list">
            <h2 style={{ color: "rgb(141, 141, 141)" }}>Hotels List</h2>
            <button
              id="btn-newHotel"
              style={{ padding: "5px" }}
              onClick={navigationNewHotelHandle}
            >
              Add New
            </button>
          </div>
        </article>
        <Table
          products={dataHotels}
          titleHead={titleHead}
          pageTitle={"hotel List"}
        />
      </div>
    </>
  );
};

export default HotelList;
