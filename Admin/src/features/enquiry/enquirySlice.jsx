import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";
export const getAllEnquiry = createAsyncThunk(
  "enquiry/get-all-enquiry",
  async (thunkAPI) => {
    try {
      return await enquiryService.getAllEnquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteEnquiries = createAsyncThunk(
  "enquiry/delete-a-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.deleteAEnquiries(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAEnquiry = createAsyncThunk(
  "enquiry/get-a-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.getAEnquiries(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updataAEnquiry = createAsyncThunk(
  "enquiry/updata-a-enquiry",
  async (data, thunkAPI) => {
    try {
      return await enquiryService.updateAEnquiries(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  issuccess: false,
  message: "",
};
export const resetState = createAction("Reset_all");
export const enquirySlice = createSlice({
  name: "enquires",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.enquiries = action.payload.data;
        state.message = "success";
      })
      .addCase(getAllEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.deletedenquiries = action.payload;
        state.message = "success";
      })
      .addCase(deleteEnquiries.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.EnquiryName = action.payload.name;
        state.EnquiryEmail = action.payload.email;
        state.EnquiryMob = action.payload.mobile;
        state.EnquiryComment = action.payload.comment;
        state.EnquiryStatus = action.payload.status;
        state.message = "success";
      })
      .addCase(getAEnquiry  .rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updataAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updataAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.updatedEnquiry = action.payload;

        state.message = "success";
      })
      .addCase(updataAEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export default enquirySlice.reducer;
