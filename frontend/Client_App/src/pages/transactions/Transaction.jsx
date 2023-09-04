import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./transactions.css";
import axios from "axios";

const Transaction = () => {
  const [dataTransaction, setTransaction] = useState([])
  const getData = async () => {
    const data = await axios.get("http://localhost:5000/transaction");
    const res = await setTransaction(data.data)
    console.log(res)
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <React.Fragment>
      <Navbar />
      <Header type="list" />
      <main>
        <h2>Your transactions</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">
                {/* <input type="checkbox" name="check" id="check" /> */ }#
              </th>
              <th scope="col">Hotel</th>
              <th scope="col">Room</th>
              <th scope="col">Date</th>
              <th scope="col">Price</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody id="">
            { dataTransaction.map((e, index) => (
              <tr>
                <th style={{width: '50px'}} scope="col">
                  { index > 9 ? "" : 0 }{ index + 1 }
                </th>
                <th scope="col">{ e.hotel }</th>
                <th style={{fontSize: 'small'}} scope="col">{ e.room.map(element => (
                  <span> { element.numberRoom } { element ? "," : "" } </span>
                )
                ) }</th>
                <th style={{maxWidth: '300px', fontSize: 'small'}} scope="col">{ new Date(e.dateStart).toLocaleDateString("en-GB") } - { new Date(e.dateEnd).toLocaleDateString("en-GB") }</th>
                <th style={{width: '100px'}} scope="col">${ e.price }</th>
                <th scope="col">{ e.payment }</th>

                <td style={{width: '100px', textAlign: 'center'}}>
                  <input type="button" style={ { backgroundColor: "green", color: "white" } } value={ e.status } disabled />
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </main>
    </React.Fragment>
  );
};

export default Transaction;


/* <tr>
  <td>
    <i class="bi bi-square-fill"></i>
  </td>
  <th scope="col"></th>
  <td>time</td>
  <td>
    <input type="button" value="Booked" disabled />
  </td>
</tr> */

/* <th scope="row">${pet.idpet}</th>
  <td>${pet.namepet}</td>
  <td>${pet.agepet}</td>
  <td>${pet.typepet}</td>
  <td>${pet.weightpet} kg</td>
  <td>${pet.lengthpet} cm</td>
  <td>${pet.breedpet}</td> */

