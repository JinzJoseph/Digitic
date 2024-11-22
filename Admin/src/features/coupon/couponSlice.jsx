import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponService";
export const getAllCoupon = createAsyncThunk(
  "coupon/get-all-coupon",
  async (thunkAPI) => {
    try {
      return await couponService.getAllCoupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCoupons = createAsyncThunk(
  "coupon/create-coupon",
  async (data, thunkAPI) => {
    try {
      return await couponService.createCoupon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACoupon = createAsyncThunk(
  "coupon/get-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.getACoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCoupon = createAsyncThunk(
  "coupon/update-a-coupon",
  async (data, thunkAPI) => {
    try {
      return await couponService.updateCoupon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCoupon = createAsyncThunk(
  "coupon/delete-a-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  issuccess: false,
  message: "",
};
export const resetState = createAction("Reset_all");

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.coupons = action.payload.data;
        state.message = "success";
      })
      .addCase(getAllCoupon.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.createdCoupon = action.payload;
      })
      .addCase(createCoupons.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(getACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;

        state.getCouponName = action.payload.name;
        state.getCouponExpiry = action.payload.expiry;
        state.getCoupondiscount = action.payload.discount;
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.updatedCoupon = action.payload;

      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.deletedCoupon = action.payload;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export default couponSlice.reducer;
