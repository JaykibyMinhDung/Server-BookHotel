import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./transactions.css";
import axios from "axios";

const Transaction = () => {
  const [dataTransaction, setTransaction] = useState([]);
  const [dataNameHotel, setDataNameHotel] = useState([]);
  const dataUserLocal = JSON.parse(localStorage.getItem('User'));
  const getData = async () => {
    const data = await axios.get(`http://localhost:5000/transaction?userId=${dataUserLocal.length > 0 ? dataUserLocal[0].userId : ''}${dataUserLocal.length > 0 ? '&username=' + dataUserLocal[0].emailUser : ''}`);
    const res = await setTransaction(data.data.Transactions);
    setDataNameHotel(data.data.nameHotel);
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <React.Fragment>
      <Navbar />
      <Header type="list" />
      <main className="layout_transaction">
        <h2 style={{paddingBottom: '20px'}}>Your transactions</h2>
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
              <tr key={index}>
                <th style={{fontWeight: '400', width: '50px'}} scope="col">
                  { index > 9 ? "" : 0 }{ index + 1 }
                </th>
                <th style={{fontWeight: '400', width: '290px'}} scope="col">{ dataNameHotel[index] }</th>
                <th style={{fontWeight: '400', width: '200px'}} scope="col">{ e.room.map(element => (
                  <span> { element.numberRoom } { element ? "," : "" } </span>
                )
                ) }</th>
                <th style={{fontWeight: '400', maxWidth: '400px', width: '300px'}} scope="col">{ new Date(e.dateStart).toLocaleDateString("en-GB") } - { new Date(e.dateEnd).toLocaleDateString("en-GB") }</th>
                <th style={{fontWeight: '400', width: '100px'}} scope="col">${ e.price }</th>
                <th style={{fontWeight: '400', width: '100px'}} scope="col">{ e.payment }</th>
                <td style={{fontWeight: '400', width: '150px', textAlign: 'center'}}>
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

