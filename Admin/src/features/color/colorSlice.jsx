import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorService from "./colorService";
export const getAllColor = createAsyncThunk(
  "color/get-all-color",
  async (thunkAPI) => {
    try {
      return await colorService.getAllColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createColor = createAsyncThunk(
  "color/create-color",
  async (data, thunkAPI) => {
    try {
      return await colorService.createColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAColor = createAsyncThunk(
  "color/get-a-color",
  async (id, thunkAPI) => {
    try {
      return await colorService.getColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateColor = createAsyncThunk(
  "color/update-a-color",
  async (data, thunkAPI) => {
    try {
      return await colorService.updateColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteColor = createAsyncThunk(
  "color/delete-a-color",
  async (id,thunkAPI) => {
    try {
      return await colorService.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  issuccess: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.colors = action.payload.data;
        state.message = "success";
      })
      .addCase(getAllColor.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.createdcolors = action.payload;
        state.message = "success";
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.getcolor = action.payload.title;
        state.message = "success";
      })
      .addCase(getAColor.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.updatedcolor = action.payload;
        state.message = "success";
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      }) 
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.deletedcolor = action.payload;
        state.message = "success";
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState);
  },
});
export default colorSlice.reducer;
