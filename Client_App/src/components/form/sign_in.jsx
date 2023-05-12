import React, { useState } from "react";
import Style from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthenticateAction } from "../../store/auth";

const Signin = (props) => {
  const navigate = useNavigate();
  const dispatchUser = useDispatch(AuthenticateAction);
  // const selector = useSelector()
  const [takeEmail, setTakeEmail] = useState("");
  const signin = () => {
    navigate("/signup");
  };
  const Validemail = () => {
    console.log(takeEmail);
    dispatchUser(AuthenticateAction.login(takeEmail));
  };
  const handleChange = (event) => {
    setTakeEmail(event.target.value);
  };
  return (
    <div>
      <div className={Style.nav}>
        <h2>Booking</h2>
        <div>
          <button onClick={signin}>Sign Up</button>
          <button disabled>Login</button>
        </div>
      </div>
      <div className={Style.formSignUp}>
        <h2>Login</h2>
        <form action="http://localhost:5000/signin" method="post">
          <input type="email" name="email" id="email" onChange={handleChange} />
          <br />
          <input type="password" name="password" id="password" />
          <br />
          <button onClick={Validemail}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
