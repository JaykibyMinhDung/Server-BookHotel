import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Style from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

const Signin = (props) => {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const signin = () => {
    navigate("/signup");
  };
  // const valuesInput = getValues();
  // console.log(valuesInput);

  const login = (e) => {
    // post về login để lấy dữ liệu true hoặc false, nếu true thì chuyển hướng ở front-end, nếu false thì không, tạo lỗi
    if (e) {
      fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e.email,
          password: e.password,
        }),
      })
        .then((data) => {
          if (data.SatusCode === 500) {
            throw new Error(data.message);
          }
          return data.json();
        })
        .then((results) => {
          console.log(results.token);
          localStorage.setItem(
            "User",
            JSON.stringify([
              {
                tokenId: results.token,
                userId: results.userId,
                emailUser: results.emailUser,
              },
            ])
          );
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // useEffect(() => {
  //   login();
  // }, []);
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
        <form
          // action="http://localhost:5000/signin"
          onSubmit={handleSubmit(login)}
          // method="post"
        >
          <input
            type="email"
            {...register("email", {
              require: "Please type email ",
              minLength: 4,
            })}
            id="email"
            placeholder="email"
          />
          <br />
          <input
            type="password"
            {...register("password", {
              require: "Password is require",
              minLength: 4,
            })}
            id="password"
            placeholder="password"
          />
          <br />
          {errors.password && errors.email && (
            <span>This field is required</span>
          )}
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;