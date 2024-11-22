import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],

  isError: false,
  isLoading: false,
  issuccess: false,
  message: "",
};

export const getAllProducts = createAsyncThunk(
  "products/get-all-products",
  async (data,thunkAPI) => {
    try {
      return await productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addRating = createAsyncThunk(
  "products/add-rating",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await productService.rateproduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAProducts = createAsyncThunk(
  "products/get-a-products",
  async (id, thunkAPI) => {
    try {
      return await productService.getAProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const AddtoWishList = createAsyncThunk(
  "products/addtowishlist",
  async (id, thunkAPI) => {
    try {
      return await productService.AddToWishListProducts(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.products = action.payload;
        state.message = "success";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;

        state.isLoading = false;
      })
      .addCase(AddtoWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddtoWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.WishList = action.payload;
        state.message = "success";
      })
      .addCase(AddtoWishList.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;

        state.isLoading = false;
      })
      .addCase(getAProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.singleProduct = action.payload;
        state.message = "success";
      })
      .addCase(getAProducts.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.error;

        state.isLoading = false;
      })
      .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.rating = action.payload;
        state.message = "success";
        if (state.issuccess) {
          toast.success("Rating successfully added...");
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.error;

        state.isLoading = false;
      });
  },
});
export default ProductSlice.reducer;
