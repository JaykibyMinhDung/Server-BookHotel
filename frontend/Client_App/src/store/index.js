import { configureStore } from "@reduxjs/toolkit";

import SearchHotel from "./auth";

const store = configureStore({
  reducer: { Auth: SearchHotel.reducer },
});

export default store;
