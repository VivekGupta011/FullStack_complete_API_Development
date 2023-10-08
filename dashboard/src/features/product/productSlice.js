import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";


export const getProducts = createAsyncThunk(
  "product/allproduct",
  async (thunkApi) => {
    try {
      return await productService.fetchProduct();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createProducts = createAsyncThunk(
  "product/createproduct",
  async (product, thunkApi) => {
    try {
      return await productService.createProduct(product)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all")


const intialstate = {
  products: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};


const productSlice = createSlice({
  name: "product",
  initialState: intialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.products = [];
        state.message = action.error.message;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.createdProduct = [];
        state.message = action.error.message;
      })
      .addCase(resetState, () => intialstate)
  },
});

export default productSlice.reducer;
