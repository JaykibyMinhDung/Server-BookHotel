import React from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./transactions.css";

const Transaction = () => {
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
                {/* <input type="checkbox" name="check" id="check" /> */}#
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
            <tr>
              {/* <th scope="row">${pet.idpet}</th>
              <td>${pet.namepet}</td>
              <td>${pet.agepet}</td>
              <td>${pet.typepet}</td>
              <td>${pet.weightpet} kg</td>
              <td>${pet.lengthpet} cm</td>
              <td>${pet.breedpet}</td> */}
              <td>
                <i class="bi bi-square-fill"></i>
              </td>
              <td>time</td>
              <td>
                <input type="button" value="Booked" disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </React.Fragment>
  );
};

export default Transaction;
