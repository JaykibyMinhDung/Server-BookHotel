import React from "react";
import Navigator from "../components/dashbroad/Navigator";

const RoomsList = () => {
  const navigationNewRoomHandle = () => {};
  return (
    <>
      <Navigator />
      <main className="main__dashbroad">
        <article>
          <div className="headerHotel__list">
            <h2 style={{ color: "rgb(141, 141, 141)" }}>Rooms List</h2>
            <button
              id="btn"
              style={{ padding: "5px;" }}
              onClick={navigationNewRoomHandle}
            >
              Add New
            </button>
          </div>
        </article>
      </main>
    </>
  );
};

export default RoomsList;
