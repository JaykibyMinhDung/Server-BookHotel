import { createSlice } from "@reduxjs/toolkit";

// const initialAuthState = async () => {
//   const isAuthServer = await fetch("http://localhost:5000/signin");
//   const res = await isAuthServer.json();
//   console.log(res);
//   return { hasUser: false };
// };

const initialAuthState = { hasUser: false, email: "Chua nhan duoc email" };

const AuthenticateSlice = createSlice({
  name: "Authenticate",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.hasUser = true;
      state.email = action.payload;
    },
    logout: (state) => {
      state.hasUser = false;
      state.email = "";
    },
  },
});

export const AuthenticateAction = AuthenticateSlice.actions;

export default AuthenticateSlice;
