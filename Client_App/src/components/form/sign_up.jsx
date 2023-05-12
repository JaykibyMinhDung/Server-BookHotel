import React from "react";
import Style from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();

  const signin = () => {
    navigate("/signin");
  };

  return (
    <div>
      <div className={Style.nav}>
        <h2>Booking</h2>
        <div>
          <button disabled>Sign Up</button>
          <button onClick={signin}>Login</button>
        </div>
      </div>
      <div className={Style.formSignUp}>
        <h2>Sign Up</h2>
        <form action="http://localhost:5000/signup" method="post">
          <input type="email" name="email" id="email" />
          <br />
          <input type="password" name="password" id="password" />
          <br />
          <button>Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
