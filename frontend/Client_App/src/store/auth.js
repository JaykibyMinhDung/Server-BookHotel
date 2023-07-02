import { createSlice } from "@reduxjs/toolkit";

// const initialAuthState = async () => {
//   const isAuthServer = await fetch("http://localhost:5000/signin");
//   const res = await isAuthServer.json();
//   console.log(res);
//   return { hasUser: false };
// };

const initialAuthState = { hotel: [] };

const SearchHotel = createSlice({
  name: "Search",
  initialState: initialAuthState,
  reducers: {
    ADD: (state, action) => {
      // state.hasUser = true;
      state.hotel = state.hotel.push(action.payload);
    },
    // logout: (state) => {
    //   state.hasUser = false;
    //   state.email = "";
    // },
  },
});

export const AuthenticateAction = SearchHotel.actions;

export default SearchHotel;
