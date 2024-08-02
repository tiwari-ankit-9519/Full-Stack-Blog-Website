import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000/api/v1/users";

const initialState = {
  user: null,
  error: null,
  loading: false,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/register`, formData);
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/login`, formData);
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "users/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/profile`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      return response.data.user;
    } catch (e) {
      rejectWithValue(e.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const userReducer = userSlice.reducer;
export const { logoutUser } = userSlice.actions;
export default userReducer;
