import React from "react";

const Login = () => {
  return (
    <div className="form__box">
      <div className="">
        <h2>Administration</h2>
      </div>
      <div>
        <form action="/" method="POST">
          <div className="form__box--inputEmail">
            <label htmlFor="email">Admin email</label>
            <br />
            <input type="email" name="email" id="email" autoComplete="off" />
          </div>
          <div className="form__box--inputEmail">
            <label htmlFor="password">Admin password</label>
            <br />
            <input
              type="password"
              name="password"
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
