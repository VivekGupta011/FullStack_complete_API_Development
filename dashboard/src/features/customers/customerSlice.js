import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from './customerService'


const initialstate = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getUsers = createAsyncThunk(
  "users/all-user",
  async (thunkApi) => {
    try {
      return await customerService.fetchUsers();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const customerSlice = createSlice({
  name: "users",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.customers = [];
        state.message = action.error.message;
      });
  },
});

export default customerSlice.reducer;