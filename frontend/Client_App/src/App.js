import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import bookHotel from "./pages/bookHotel/bookHotel";
import List from "./pages/list/List";
import Signup from "./components/form/sign_up";
import Signin from "./components/form/sign_in";
import Transaction from "./pages/transactions/Transaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
