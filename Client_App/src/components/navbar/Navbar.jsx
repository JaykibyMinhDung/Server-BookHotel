import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthenticateAction from "../../store/auth";
import "./navbar.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch(AuthenticateAction.actions);
  const selectorAuth = useSelector((state) => state.Auth.hasUser);
  const selectorEmail = useSelector((state) => state.Auth.email);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [gmailUser, setGmailUser] = useState("");
  const isLogin = AuthenticateAction.actions.login();
  const Signup = () => {
    navigate("/signup");
  };
  const Signin = () => {
    navigate("/signin");
  };
  const logout = () => {
    dispatch(AuthenticateAction.actions.logout());
    navigate("/");
  };

  console.log(path);
  const takedata = async () => {
    const response = await fetch("http://localhost:5000/signin");
    const data = await response.json();
    console.log(data);
    const findUser = await data.find((e) => e.id === path.slice(1));
    if (findUser) {
      console.log(selectorEmail);
      setGmailUser(findUser.email);
      dispatch(isLogin);
    }
  };

  useEffect(() => {
    takedata();
    // console.log(selectorAuth);
  }, []);
  return (
    <div className="navbar">
      <div className="navContainer">
        {/* Sử dụng redux để tạo case sau đó lấy biến đó sử dụng làm đối số trong câu điều kiện loại 3 để thay đổi giao diện */}
        <span className="logo">
          {selectorAuth ? "Booking" : "Booking Website"}
        </span>
        {/* Booking */}
        <div className="navItems">
          <span>{selectorAuth ? gmailUser : ""}</span>
          <button className="navButton" onClick={Signup}>
            {selectorAuth ? "Transaction" : "Register"}
          </button>
          {/* Transaction */}
          <button
            className="navButton"
            onClick={selectorAuth ? logout : Signin}
          >
            {selectorAuth ? "Logout" : "Login"}
          </button>
          {/* Logout */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
