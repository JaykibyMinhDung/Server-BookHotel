import { configureStore } from "@reduxjs/toolkit";

import AuthenticateSlice from "./auth";

const store = configureStore({
  reducer: { Auth: AuthenticateSlice.reducer },
});

export default store;
