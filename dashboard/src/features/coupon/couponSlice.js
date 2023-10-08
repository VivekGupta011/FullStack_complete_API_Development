import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponProvider from "./couponProvider";



export const getCoupons = createAsyncThunk("coupons/allcoupon", async (thunkApi) => {
  try {
    return await couponProvider.fetchCoupon()
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCoupons = createAsyncThunk("coupon/createcoupon", async (coupon,thunkApi) => {
  try {
    return await couponProvider.createCoupon(coupon)
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getCoupon = createAsyncThunk('coupon/getcoupon', async(couponId, thunkApi) =>{
  try {
    return await couponProvider.getACoupon(couponId)
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

export const updateCoupon = createAsyncThunk("coupon/updatecoupon", async (coupon,thunkApi) => {
  try {
    return await couponProvider.updateACoupon(coupon)
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteCoupon = createAsyncThunk("coupon/deletecoupon", async (couponId,thunkApi) => {
  try {
    return await couponProvider.deleteACoupon(couponId)
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const resetState = createAction("Reset_all")

const initialstate = {
  coupons: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};


const couponSlice = createSlice({
  name: "coupons",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.coupons = [];
        state.message = action.error.message;
      })
      .addCase(createCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdCoupon = action.payload;
      })
      .addCase(createCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.createdCoupon = [];
        state.message = action.error.message;
      })
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.couponName = action.payload.name;
        state.couponExpiry = action.payload.expiry;
        state.couponDiscount = action.payload.discount;
        state.message = action.error;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.couponName = [];
        state.message = action.error;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedCoupon = action.payload;
        state.message = action.error;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.updatedCoupon = [];
        state.message = action.error;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedCoupon = action.payload;
        state.message = action.error;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.deletedCoupon = [];
        state.message = action.error;
      })
      .addCase(resetState, () => initialstate)
  },
});

export default couponSlice.reducer;
