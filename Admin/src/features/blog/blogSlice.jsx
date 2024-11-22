import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogServices";
export const getAllBlog = createAsyncThunk(
  "blog/get-all-blog",
  async (thunkAPI) => {
    try {
      return await blogService.getAllBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createBlog = createAsyncThunk(
  "blog/create-blog",
  async (data, thunkAPI) => {
    try {
      return await blogService.createBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getBlog = createAsyncThunk(
  "blog/get-a-blog",
  async (id, thunkAPI) => {
    try {
      return await blogService.getABlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updatedBlog = createAsyncThunk(
  "blog/update-a-blog",
  async (data, thunkAPI) => {
    try {
      return await blogService.updateBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteBlog = createAsyncThunk(
  "blog/delete-a-blog",
  async (id, thunkAPI) => {
    try {
      return await blogService.deleteBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  issuccess: false,
  message: "",
};
export const resetState = createAction("Reset_all");
export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.blogs = action.payload.data;
        state.message = "success";
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.createdBlog = action.payload;
        state.message = "success";
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.BlogName = action.payload.title;
        state.Blogcategory = action.payload.category;
        state.BlogDescription = action.payload.description;
        state.BlogImages = action.payload.images;
        state.message = "success";
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updatedBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.updateBlog = action.payload;

        state.message = "success";
      })
      .addCase(updatedBlog.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.deletedBlog = action.payload;

        state.message = "success";
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export default blogSlice.reducer;



