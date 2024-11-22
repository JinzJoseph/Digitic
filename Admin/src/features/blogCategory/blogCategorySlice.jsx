import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogCategoriesService from "./blogCategoryService";
export const getAllBlogCategory = createAsyncThunk(
  "blog/get-all-blog-category",
  async (thunkAPI) => {
    try {
      return await blogCategoriesService.getAllBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createBlogCategory = createAsyncThunk(
  "blog-category/create-blog-category",
  async (data, thunkAPI) => {
    try {
      return await blogCategoriesService.createBlogCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getBlogCategory = createAsyncThunk(
  "blog-category/get-blog-category",
  async (id, thunkAPI) => {
    try {
      return await blogCategoriesService.getABlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBlogCategory= createAsyncThunk(
  "blog-category/updata-blog-category",
  async (data, thunkAPI) => {
    try {
      return await blogCategoriesService.updateBlogCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteBlogCategory = createAsyncThunk(
  "blog-category/delete-blog-category",
  async (id, thunkAPI) => {
    try {
      return await blogCategoriesService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  blogcategories: [],
  isError: false,
  isLoading: false,
  issuccess: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "blogcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.blogcategories = action.payload.data;
        state.message = "success";
      })
      .addCase(getAllBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.createdblogcategory = action.payload;
        state.message = "success";
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.getblogcategory = action.payload.title;
        state.message = "success";
      })
      .addCase(getBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.updatedblogcategory = action.payload;
        state.message = "success";
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.deletedblogcategory = action.payload;
        state.message = "success";
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export default colorSlice.reducer;

