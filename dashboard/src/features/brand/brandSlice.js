import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandProvider from "./brandProvider";


export const getBrands = createAsyncThunk("brands/getallbrand", async (thunkApi) => {
  try {
    return await brandProvider.fetchBrand();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createBrands = createAsyncThunk("brands/createbrand", async (brand,thunkApi) => {
  try {
    return await brandProvider.createBrand(brand)
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getBrand = createAsyncThunk("brand/get-brand", async (brandId,thunkApi) => {
  try {
    return await brandProvider.getBrand(brandId)
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateBrand = createAsyncThunk("brand/update-brand", async (brand, thunkApi) => {
  try {
    return await brandProvider.updateABrand(brand)
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteBrand = createAsyncThunk("brand/delete-brand", async (brandId, thunkApi) => {
  try {
    return await brandProvider.deleteABrand(brandId)
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const resetState = createAction("Reset_all")

const initialstate = {
  brands: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};


const brandSlice = createSlice({
  name: "brands",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.brands = [];
        state.message = action.error.message;
      })
      .addCase(createBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdBrand = action.payload;
      })
      .addCase(createBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.createdBrand = [];
        state.message = action.error.message;
      })
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brandName = action.payload.title;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.brandName = [];
        state.message = action.error.message;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedBrand = action.payload;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.updatedBrand = [];
        state.message = action.error.message;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedBrand = action.payload;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.deleteBrand = [];
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialstate)
  },
});

export default brandSlice.reducer;
