import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";
import { toast } from 'react-toastify';



export const createEnq = createAsyncThunk('enquiry/createenq', async (enquiry, thunkAPI) => {
    try {
        return await enquiryService.createEnquiry(enquiry) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


const initialstate = {
    createdEnq: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
}

const enquirySlice = createSlice({
    name: "enquiry",
    initialState: initialstate,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createEnq.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createEnq.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdEnq = action.payload;
            if(state.isSuccess === true){
                toast.success("Your Enquiry Submitted Successfully")
            }
        })
        .addCase(createEnq.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.createdEnq = [];
            state.message = action.error;
            if(state.isError === true){
                toast.error("Fail To Submit Enquiry", action.error)
            }
        })
    }
})

export default enquirySlice.reducer;