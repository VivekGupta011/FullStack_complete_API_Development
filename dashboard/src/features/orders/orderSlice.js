import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import orderService from "./orderService";

const intialstate = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getOrders = createAsyncThunk(
  "orders/allorders",
  async (configHeader, thunkApi) => {
    try {
      return await orderService.fetchOrders(configHeader)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getSingleOrderData = createAsyncThunk(
  "orders/getorder",
  async (data, thunkApi) => {
    try {
      return await orderService.getOrder(data)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateOrderData = createAsyncThunk(
  "orders/update-order-status",
  async (data, thunkApi) => {
    try {
      return await orderService.updateOrder(data)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const resetState = createAction("Reset_all");

const orderSlice = createSlice({
  name: "orders",
  initialState: intialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.orders = [];
        state.message = action.error.message;
      })
      .addCase(getSingleOrderData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrderData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orderByUser = action.payload.orderItems;
      })
      .addCase(getSingleOrderData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.orderByUser = [];
        state.message = action.error.message;
      })
      .addCase(updateOrderData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedStatus = action.payload;
      })
      .addCase(updateOrderData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.updatedStatus = [];
        state.message = action.payload.response.data.message;
      })
      .addCase(resetState, () => intialstate)
  },
});

export default orderSlice.reducer;
