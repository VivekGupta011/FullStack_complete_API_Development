import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

const initialstate = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkApi) => {
    try {
      const formData = new FormData()
      for(let i = 0; i< data.length; i++){
        formData.append("images", data[i])
      }
      return await uploadService.uploadImg(formData)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "delete/images",
  async (public_id, thunkApi) => {
    try {
      return await uploadService.deleteImg(public_id)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const uploadSlice = createSlice({
  name: "images",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.images = [];
        state.message = action.error.message;
      })
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [];
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
  },
});

export default uploadSlice.reducer;