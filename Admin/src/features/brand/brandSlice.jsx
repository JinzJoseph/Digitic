import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "./brandService";
export const getAllBrand = createAsyncThunk(
  "brand/get-all-brand",
  async (thunkAPI) => {
    try {
      return await brandService.getAllBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createBrand = createAsyncThunk(
  "brand/create-brand",
  async (data, thunkAPI) => {
    try {
      return await brandService.createBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getABrand = createAsyncThunk(
  "brand/get-a-brand",
  async (id, thunkAPI) => {
    try {
      return await brandService.getBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBrand = createAsyncThunk(
  "brand/update-a-brand",
  async (data, thunkAPI) => {
    try {
      return await brandService.updateBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteBrand = createAsyncThunk(
  "brand/delete-a-brand",
  async (id,thunkAPI) => {
    try {
      return await brandService.deleteBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  issuccess: false,
  message: "",
};
export const resetState = createAction("Reset_all");
export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.brands = action.payload.data;
        state.message = "success";
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.createdBrands = action.payload;
        state.message = "success";
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getABrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.brandName = action.payload.title;
        state.message = "success";
      })
      .addCase(getABrand.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.updatedBrand = action.payload;
        state.message = "success";
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.deletedBtand = action.payload;
        state.message = "success";
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export default brandSlice.reducer;
