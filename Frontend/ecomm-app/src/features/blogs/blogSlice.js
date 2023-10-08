import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";


export const getBlogs = createAsyncThunk("blog/getallblogs", async (thunkAPI) => {
    try {
        return await blogService.getAllBlogs()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getBlog = createAsyncThunk("blog/getblog", async (blogId, thunkAPI) => {
    try {
        return await blogService.getABlog(blogId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})





const initialstate = {
    blogs: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
}

const blogSlice = createSlice({
    name: "blog",
    initialState: initialstate,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getBlogs.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.blogs = action.payload;
        })
        .addCase(getBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.blogs = [];
            state.message = action.error;
        })
        .addCase(getBlog.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.singleBlog = action.payload;
        })
        .addCase(getBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.singleBlog = [];
            state.message = action.error;
        })

    }
})

export default blogSlice.reducer;