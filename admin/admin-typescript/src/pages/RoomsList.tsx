import React, { useEffect, useState } from "react";
import Navigator from "../components/dashbroad/Navigator";
import Table from "../components/table/Table";
import { Managers } from "../apis/Managers";

const RoomsList = () => {
  const [dataRooms, setdataRooms] = useState([]);

  const navigationNewRoomHandle = () => {};
  const titleHead = [
    "ID",
    "Title",
    "Description",
    "Price",
    "Max People",
    "Action",
    "Edit",
  ];
  useEffect(() => {
    Managers()
      .getRoomsList()
      .then((res) => setdataRooms(res.ListRoom))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <article>
          <div className="headerHotel__list">
            <h2 style={{ color: "rgb(141, 141, 141)" }}>Rooms List</h2>
            <button
              id="btn"
              style={{ padding: "5px" }}
              onClick={navigationNewRoomHandle}
            >
              Add New
            </button>
          </div>
        </article>
      </main>
      <div>
        <Table
          products={dataRooms}
          titleHead={titleHead}
          pageTitle={"rooms List"}
        />
      </div>
    </>
  );
};

export default RoomsList;
