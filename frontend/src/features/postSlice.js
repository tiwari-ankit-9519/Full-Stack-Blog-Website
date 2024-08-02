/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000/api/v1/posts";

const initialState = {
  loading: false,
  error: null,
  posts: [],
  message: null,
  post: null,
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/`, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return { id: response.data.post.id };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/${postId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.message = action.payload.message;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSinglePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post;
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

const postReducer = postSlice.reducer;

export default postReducer;
