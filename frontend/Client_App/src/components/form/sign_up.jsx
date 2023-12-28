import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

import Style from "./SignUp.module.css";

const Signup = (props) => {
  const navigate = useNavigate();
  const [changeInput, setChangeInput] = useState({
    email: "",
    password: ""
  })
  const signin = () => {
    navigate("/");
  };

  const validInputHandle = (event) => {
    setChangeInput(() => {
      return {
        email: event.target?.name === 'email' ? event.target?.value : changeInput.email,
        password: event.target?.name === 'password' ? event.target?.value :  changeInput.password,
      } 
    })
  }
  const submitForm = (e) => {
    e.preventDefault()
    if (!changeInput.email.trim() || !changeInput.password.trim()) {
      return toast.error(`Vui lòng điền ${!changeInput.email.trim() ? 'email' : 'password'} vào form `)
    } else {
      return axios.post("http://localhost:5000/signup", changeInput)
      .then((res) => {
        if (res.data.statusCode) {
          return toast.success(res.data.message)
        } else {
          return toast.error(res.data.message);
        }
      }).then(() => setTimeout(navigate('/'), 5000))
    }
  }

  return (
    <div>
      <div className={Style.nav}>
        <h2>Booking</h2>
        <div>
          <button disabled>Sign Up</button>
          <button onClick={signin}>Login</button>
        </div>
      </div>
      <Toaster />
      <div className={Style.formSignUp}>
        <h2>Sign Up</h2>
        <form>
          <input type="email" value={changeInput.email} onChange={(e) => validInputHandle(e)} name="email" id="email" min={5} />
          <br />
          <input type={"password"} value={changeInput.password} onChange={(e) => validInputHandle(e)} name="password" id="password" min={5} />
          <br />
          <button type="button" onClick={submitForm} >Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
