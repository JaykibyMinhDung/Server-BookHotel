import Navigator from "../components/dashbroad/Navigator";
import React, { useEffect, useState } from "react";
import { Managers } from "../apis/Managers";
import "../components/dashbroad/dashbroad.css";
import Table from "../components/table/Table";

const Transaction = () => {
  const [dataTransactions, setdataTransactions] = useState([]);

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
      .getTransactions()
      .then((res) => {
        setdataTransactions(res.AllListTransaction);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <article>
          <h2 style={{ color: "rgb(141, 141, 141)" }}>Transactions List</h2>
        </article>
      </main>
      <Table
        products={dataTransactions}
        titleHead={titleHead}
        pageTitle={"transaction List"}
      />
    </>
  );
};

export default Transaction;
