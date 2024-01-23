import React from "react";
import { useForm } from "react-hook-form";
import "../components/css/login.css";
import { fetchAuthenticated } from "../apis/Authenticated";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    fetchAuthenticated()
      .postLogin(data)
      .then((res) => {
        localStorage.setItem("access_user", JSON.stringify(res));
        alert("Đăng nhập thành công!");
      })
      .then(() => navigate("/"))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="form__box">
      <div className="">
        <h2>Administration</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__box--inputEmail">
            <label htmlFor="email">Admin email</label>
            <br />
            <input
              type="email"
              id="email"
              {...register("email")}
              autoComplete="off"
            />
          </div>
          <div className="form__box--inputEmail">
            <label htmlFor="password">Admin password</label>
            <br />
            <input
              type="password"
              {...register("password")}
              id="password"
              autoComplete="off"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
