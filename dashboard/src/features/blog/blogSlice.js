import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";


export const getBlogs = createAsyncThunk(
  "blogs/allblogs",
  async (thunkApi) => {
    try {
      return await blogService.fetchBlog()
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createBlogs = createAsyncThunk(
  "blogs/createblog",
  async (blog, thunkApi) => {
    try {
      return await blogService.createBlog(blog)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getBlog = createAsyncThunk(
  "blogs/getblog",
  async (blogId, thunkApi) => {
    try {
      return await blogService.getABlog(blogId)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateblog",
  async (blog, thunkApi) => {
    try {
      return await blogService.updateABlog(blog)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteblog",
  async (blogId, thunkApi) => {
    try {
      return await blogService.deleteABlog(blogId)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialstate = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


const blogSlice = createSlice({
  name: "blogs",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogs = [];
        state.message = action.error.message;
      })
      .addCase(createBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlog = action.payload;
      })
      .addCase(createBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.createdBlog = [];
        state.message = action.error.message;
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogName = action.payload.title;
        state.blogDescription = action.payload.description;
        state.blogCategoryTitle = action.payload.category;
        state.blogImage = action.payload.image[0];
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogName = [];
        state.blogDescription = [];
        state.blogCategoryTitle = [];
        state.blogImage = [];
        state.message = action.error.message;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updatedBlog = [];
        state.message = action.error.message;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlog = action.payload;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deletedBlog = [];
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialstate)
  },
});

export default blogSlice.reducer;