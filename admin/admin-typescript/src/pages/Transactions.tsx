import React from "react";
import Navigator from "../components/dashbroad/Navigator";

const Transaction = () => {
  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <article>
          <h2 style={{ color: "rgb(141, 141, 141)" }}>Transactions List</h2>
        </article>
      </main>
    </>
  );
};

export default Transaction;
