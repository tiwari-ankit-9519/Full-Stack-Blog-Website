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
  latestPosts: [],
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
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}?category=${category}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching posts"
      );
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

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseURL}/${postData.postId}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return postId;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getlatestPosts = createAsyncThunk(
  "posts/getlatestBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/post/latest`);
      return response.data.posts;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const searchPosts = createAsyncThunk(
  "posts/searchBlogs",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseURL}/search/title?title=${searchTerm}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const filterPosts = createAsyncThunk(
  "posts/filterBlogs",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/filter/${category}`);
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
        state.posts = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "An error occurred while fetching posts.";
        state.posts = [];
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
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const postIndex = state.posts.findIndex(
          (post) => post.id === action.payload.post.id
        );
        state.posts[postIndex] = action.payload.post;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(getlatestPosts.pending, (state) => {
        state.loading = true;
        state.latestPosts = null;
      })
      .addCase(getlatestPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.latestPosts = action.payload;
      })
      .addCase(getlatestPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

const postReducer = postSlice.reducer;

export default postReducer;
