import React from "react";
import Table from "../components/table/Table";
import Navigator from "../components/dashbroad/Navigator";

const HotelList = () => {
  const navigationNewHotelHandle = () => {};
  const products = [
    {
      _id: "udsahfsofho",
      user: "jaykiby",
      romm: [1, 2, 3],
      dateStart: "20/12/2023",
      dateEnd: "29/12/2023",
      price: 127,
      payment: "bank",
      status: "success",
    },
  ];
  return (
    <>
      <Navigator />
      <div className="main__dashbroad">
        <article>
          <div className="headerHotel__list">
            <h2 style={{ color: "rgb(141, 141, 141)" }}>Hotels List</h2>
            <button
              id="btn-newHotel"
              style={{ padding: "5px;" }}
              onClick={navigationNewHotelHandle}
            >
              Add New
            </button>
          </div>
        </article>
        <Table products={products} pageTitle={"New Hotel"} />
      </div>
    </>
  );
};

export default HotelList;
