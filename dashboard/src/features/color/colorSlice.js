import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";


export const getColors = createAsyncThunk(
  "colors/getallcolor",
  async (thunkApi) => {
    try {
      return await colorService.fetchColor()
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createColors = createAsyncThunk(
  "colors/createcolor",
  async (colorData, thunkApi) => {
    try {
      return await colorService.createColor(colorData)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getColorById = createAsyncThunk(
  "colors/getcolor",
  async (colorId, thunkApi) => {
    try {
      return await colorService.getColorById(colorId)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateColor = createAsyncThunk(
  "colors/updatecolor",
  async (color, thunkApi) => {
    try {
      return await colorService.updateAColor(color)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "colors/deletecolor",
  async (colorId, thunkApi) => {
    try {
      return await colorService.deleteAColor(colorId)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all")

const initialstate = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


const colorSlice = createSlice({
  name: "users",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = [];
        state.message = action.error.message;
      })
      .addCase(createColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
      })
      .addCase(createColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.createdColor = [];
        state.message = action.error.message;
      })
      .addCase(getColorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorName = action.payload.title;
      })
      .addCase(getColorById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colorName = [];
        state.message = action.error.message;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updatedColor = [];
        state.message = action.error.message;
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedColor = action.payload;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deletedColor = [];
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialstate)
  },
});

export default colorSlice.reducer;