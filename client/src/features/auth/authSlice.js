import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const getUserFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
export const createUser = createAsyncThunk(
  "auth/user-Register",
  async (user, thunkAPI) => {
    try {
      return await authService.RegisterUser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getForgetPasswordRToken = createAsyncThunk(
  "user/password/token",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const ResetUserPassword = createAsyncThunk(
  "user/reset-password/",
  async (data, thunkAPI) => {
    try {
      return await authService.ResetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login-user",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUserWishList = createAsyncThunk(
  "user/wishList-user",
  async (thunkAPI) => {
    try {
      return await authService.getUserWishListById();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addtoCart = createAsyncThunk(
  "user/add-to-cart",
  async (data, thunkAPI) => {
    try {
      return await authService.addToCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUserCart = createAsyncThunk(
  "user/get-cart",
  async (thunkAPI) => {
    try {
      return await authService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteCartProduct = createAsyncThunk(
  "user/delete-cart-product",
  async (id, thunkAPI) => {
    try {
      return await authService.deleteProductFromCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateproductQuantity = createAsyncThunk(
  "user/updata-product-Qty",
  async (cartDeatils, thunkAPI) => {
    try {
      return await authService.updateProductQty(cartDeatils);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createAOrder = createAsyncThunk(
  "user/create-a-order",
  async (orderDetails, thunkAPI) => {
    try {
      return await authService.createOrder(orderDetails);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getuserOrders = createAsyncThunk(
  "user/get-my-order",
  async (thunkAPI) => {
    try {
      return await authService.userServices();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  "user/update-profile",
  async (data, thunkAPI) => {
    try {
      return await authService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  user: getUserFromLocalStorage,

  isError: false,
  isLoading: false,
  issuccess: false,
  message: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;

        state.message = "success";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;

        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.wishList = action.payload;
        state.message = "success";
      })
      .addCase(getUserWishList.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(addtoCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addtoCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.cartproduct = action.payload;
        state.message = "success";
        if (state.issuccess) {
          toast.success("Product added to cart successfully");
        }
      })
      .addCase(addtoCart.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.cartproducts = action.payload;
        state.message = "success";
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.deletecartproduct = action.payload;
        state.message = "success";
        if (state.issuccess) {
          toast.success("Product deleted from  cart successfully");
        }
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.error;
        state.isLoading = false;
        if (state.issuccess === false) {
          toast.success("something went wrong");
        }
      })
      .addCase(updateproductQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateproductQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.updatedProductQty = action.payload;
        state.message = "success";
        if (state.issuccess === true) {
          toast.success("Product Updated Successfully");
        }
      })
      .addCase(updateproductQuantity.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;

        state.isLoading = false;
        if (state.issuccess === false) {
          toast.error("something went wrong");
        }
      })
      .addCase(createAOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.OrderedProduct = state.payload;
        state.message = "success";
        if (state.issuccess === true) {
          toast.success("Product ordered Successfully");
        }
      })
      .addCase(createAOrder.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.error;

        state.isLoading = false;
      })
      .addCase(getuserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getuserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.getOrderedProduct = action.payload;
        state.message = "success";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.updateduser = action.payload;
        state.message = "success";
        if (state.issuccess === true) {
          toast.success("Profile Updated Successfully");
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;

        state.isLoading = false;
      })
      .addCase(getForgetPasswordRToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForgetPasswordRToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.token = action.payload;
        state.message = "success";
        if (state.issuccess === true) {
          toast.success("Forgot password sent to Email Successfully");
        }
      })
      .addCase(getForgetPasswordRToken.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;

        state.isLoading = false;
      })
      .addCase(ResetUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ResetUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issuccess = true;
        state.isError = false;
        state.password = action.payload;
        state.message = "success";
        if (state.issuccess === true) {
          toast.success(" Password updated  Successfully");
        }
      })
      .addCase(ResetUserPassword.rejected, (state, action) => {
        state.isError = true;
        state.issuccess = false;
        state.message = action.payload;

        state.isLoading = false;
      });
  },
});
export default authSlice.reducer;
