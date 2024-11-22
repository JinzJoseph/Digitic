import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

const initialState = {
  enquiry: "",

  isError: false,
  isLoading: false,
  issuccess: false,
  message: "",
};
export const createQuery = createAsyncThunk(
  "enq/createQuery",
  async (data, thunkAPI) => {
    try {
      return await enquiryService.createQuery(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const EnquirySlice = createSlice({
  name: "enquiry",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.enquiry = action.payload;
        state.message = "success";
      })
      .addCase(createQuery.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.error;

        state.isLoading = false;
      });
  },
});
export default EnquirySlice.reducer;
