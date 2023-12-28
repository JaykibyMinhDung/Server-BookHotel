import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashbroad from "./pages/Dashbroad";
import Transaction from "./pages/Transactions";
import Login from "./pages/Login";
import RoomsList from "./pages/RoomsList";
import AddnewRoom from "./pages/AddnewRoom";
import AddnewHotel from "./pages/AddnewHotel";
import HotelList from "./pages/HotelList";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashbroad />} />
        <Route>
          {/* <Route index element={} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/room_list" element={<RoomsList />} />
          <Route path="/hotel_list" element={<HotelList />} />
          <Route path="/new_room" element={<AddnewRoom />} />
          <Route path="/new_hotel" element={<AddnewHotel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
