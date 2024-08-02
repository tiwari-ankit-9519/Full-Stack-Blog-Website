import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import postReducer from "../features/postSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});

export default store;
