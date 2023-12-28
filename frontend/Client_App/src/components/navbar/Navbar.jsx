import { useNavigate } from "react-router-dom";
import "./navbar.css";
// import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  // const [NameUser, setNameUser] = useState("");
  const backHome = () => {
    navigate("/");
  };
  const transaction = () => {
    navigate("/transaction");
  };
  const Signup = () => {
    navigate("/signup");
  };
  const Signin = () => {
    navigate("/signin");
  };
  const logout = () => {
    localStorage.removeItem("User");
    return navigate("/signin");
  };

  const DataUser = JSON.parse(localStorage.getItem("User"));

  return (
    <div className="navbar">
      <div className="navContainer">
        {/* Sử dụng redux để tạo case sau đó lấy biến đó sử dụng làm đối số trong câu điều kiện loại 3 để thay đổi giao diện */}
        <span onClick={backHome} className="logo">
          {DataUser ? "Booking" : "Booking Website"}
        </span>
        {/* Booking */}
        <div className="navItems">
          <span>{DataUser ? DataUser[0].emailUser : ""}</span>
          {/* Thay đổi dấu 3 ngôi ở onClick để chuyển hướng sang trang transaction */}
          <button className="navButton" onClick={DataUser ? transaction : Signup}>
            {DataUser ? "Transaction" : "Register"}
          </button>
          {/* Transaction */}
          <button className="navButton" onClick={DataUser ? logout : Signin}>
            {DataUser ? "Logout" : "Login"}
          </button>
          {/* Logout */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
