import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";
export const getAllProductCategory = createAsyncThunk(
  "productcategory/get-all-product-category",
  async (thunkAPI) => {
    try {
      return await productCategoryService.getAllProductCategorys();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createProductCategory = createAsyncThunk(
  "productcategory/create-product-category",
  async (data, thunkAPI) => {
    try {
      return await productCategoryService.creatreProductCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAProductCategory = createAsyncThunk(
  "productcategory/get-product-category",
  async (data, thunkAPI) => {
    try {
      return await productCategoryService.getAProductCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateProductCategory = createAsyncThunk(
  "productcategory/update-product-category",
  async (data, thunkAPI) => {
    try {
      return await productCategoryService.updateProductCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteProductCategory = createAsyncThunk(
  "productcategory/delete-product-category",
  async (id, thunkAPI) => {
    try {
      return await productCategoryService.deleteProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  productcategorys: [],
  isError: false,
  isLoading: false,
  issuccess: false,
  message: "",
};
export const resetState = createAction("Reset_all");
export const productCategorySlice = createSlice({
  name: "productcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.productcategorys = action.payload.data;
        state.message = "success";
      })
      .addCase(getAllProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.createdProductCategory = action.payload;
        state.message = "success";
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.getCategory = action.payload.title;
        state.message = "success";
      })
      .addCase(getAProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.updatedCategory = action.payload;
        state.message = "success";
      })
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.deleteCategory = action.payload;
        state.message = "success";
      })
      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export default productCategorySlice.reducer;
