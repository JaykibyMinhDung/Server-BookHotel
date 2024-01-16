import React, { useEffect, useState } from "react";
import { Managers } from "../apis/Managers";
import "../components/dashbroad/dashbroad.css";
// import data from "../json/dataDashbroad.json";
import Navigator from "../components/dashbroad/Navigator";
import Table from "../components/table/Table";

type Props = {};

const Dashbroad = (props: Props) => {
  // axios.get()
  const [dataTransactions, setdataTransactions] = useState([]);
  const styleTable: string = "17rem";
  const titleHead = [
    "ID",
    "User",
    "Hotel",
    "Room",
    "Date",
    "Price",
    "Payment Method",
    "Status",
  ];
  useEffect(() => {
    Managers()
      .getDashbroad()
      .then((data) => {
        setdataTransactions(data.AllListTransaction);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <header className="box__inforBroad">
          <div className="box__inforBroad--User">
            <div>
              <h4>USER</h4>
              <p>20</p>
            </div>
            <i className="fa fa-user" aria-hidden="true"></i>
          </div>
          <div className="box__inforBroad--Order">
            <div>
              <h4>ORDER</h4>
              <p>10</p>
            </div>
            <i className="fa fa-cart-plus" aria-hidden="true"></i>
          </div>
          <div className="box__inforBroad--Earnings">
            <div>
              <h4>EARNINGS</h4>
              <p>$84379</p>
            </div>
            <i className="fas fa-coins    "></i>
          </div>
          <div className="box__inforBroad--Blance">
            <div>
              <h4>BALANCE</h4>
              <p>$84392</p>
            </div>
            <i className="fas fa-wallet   "></i>
          </div>
        </header>
        <article>
          <h2 style={{ color: "rgb(141, 141, 141)" }}>Latest Transactions</h2>
          {/* Table */}
        </article>
      </main>
      <div
        style={{
          textAlign: "right",
          margin: "0rem 2rem",
          fontSize: "large",
        }}
      >
        <Table
          style={styleTable}
          products={dataTransactions}
          titleHead={titleHead}
          pageTitle="Admin Page"
          deletedRoomAPI={Managers().deletedroomsList}
          deletedHotelAPI={Managers().deletedhotelsList}
        />
        <span style={{ marginRight: "1rem;" }}>1 - 20</span>
        <span>
          <i
            className="fa fa-arrow-left"
            style={{ color: "rgb(160, 160, 160)", fontSize: "medium" }}
            aria-hidden="true"
          ></i>
          <i
            className="fa fa-arrow-right"
            style={{ color: "rgb(160, 160, 160)", fontSize: "medium" }}
            aria-hidden="true"
          ></i>
        </span>
      </div>
    </>
  );
};

export default Dashbroad;
