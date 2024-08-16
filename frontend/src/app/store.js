import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});

export default store;
