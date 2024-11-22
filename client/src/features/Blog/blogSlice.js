import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogServices from "./blogServices";

const initialState = {
  blogs: [],

  isError: false,
  isLoading: false,
  issuccess: false,
  message: "",
};
export const getAllBlogs = createAsyncThunk(
  "blog/get-all-blogs",
  async (thunkAPI) => {
    try {
      return await blogServices.getAllBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getABlog = createAsyncThunk(
  "blog/get-a-blog",
  async (id, thunkAPI) => {
    try {
      return await blogServices.getBlogById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.blogs = action.payload;
        state.message = "success";
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;

        state.isLoading = false;
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.BlogData = action.payload;
        state.message = "success";
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;

        state.isLoading = false;
      });
  },
});
export default blogSlice.reducer;
