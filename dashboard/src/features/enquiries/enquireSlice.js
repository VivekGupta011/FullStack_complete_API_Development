import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";




const initialstate = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getEnquiries = createAsyncThunk(
  "enquiries/getallenquiry",
  async (thunkApi) => {
    try {
      return await enquiryService.fetchEnquiry()
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getEnquiry= createAsyncThunk(
  "enquiries/getenquiry",
  async (enqId, thunkApi) => {
    try {
      return await enquiryService.getAEnquiry(enqId)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateEnquiry = createAsyncThunk(
  "enquiries/updateenquiry",
  async (enq, thunkApi) => {
    try {
      return await enquiryService.updateAEnquiry(enq)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquiries/deleteenquiry",
  async (enqId, thunkApi) => {
    try {
      return await enquiryService.deleteAEnquiry(enqId)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
); 

export const resetState = createAction("Reset_all");

const enquirySlice = createSlice({
  name: "enquiries",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.enquiries = [];
        state.message = action.error.message;
      })
      .addCase(getEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getEnq = action.payload;
      })
      .addCase(getEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.getEnq = [];
        state.message = action.error.message;
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updatedEnquiry = [];
        state.message = action.error.message;
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deletedEnquiry = [];
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialstate)
  },
});

export default enquirySlice.reducer;