import React, { useEffect, useState } from "react";
import Navigator from "../components/dashbroad/Navigator";
import Table from "../components/table/Table";
import { Managers } from "../apis/Managers";
import { useNavigate } from "react-router-dom";

const RoomsList = () => {
  const [dataRooms, setdataRooms] = useState([]);
  const navigate = useNavigate();
  const styleTable: string = "2rem";
  const navigationNewRoomHandle = () => {
    return navigate("/new_room");
  };
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
  }, []); // reload mutiple time

  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <article>
          <div className="headerHotel__list">
            <h2 style={{ color: "rgb(141, 141, 141)" }}>Rooms List</h2>
            <button
              id="btn-newRoom"
              style={{ padding: "5px" }}
              onClick={navigationNewRoomHandle}
            >
              Add New
            </button>
          </div>
        </article>
        <Table
          style={styleTable}
          products={dataRooms}
          titleHead={titleHead}
          pageTitle={"rooms List"}
          deletedRoomAPI={Managers().deletedroomsList}
          deletedHotelAPI={Managers().deletedhotelsList}
        />
      </main>
    </>
  );
};

export default RoomsList;
