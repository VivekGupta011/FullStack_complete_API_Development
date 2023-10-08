import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";

export const getBlogCategories = createAsyncThunk(
  "blogcategories/getallblogcategory",
  async (thunkApi) => {
    try {
      return await blogCategoryService.fetchBlogCategory()
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createBlogCategories = createAsyncThunk(
  "blogcategories/createblogcategory",
  async (data, thunkApi) => {
    try {
      return await blogCategoryService.createBlogCategory(data)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getBlogCategory = createAsyncThunk(
  "blogcategories/getblogcategory",
  async (bCatId, thunkApi) => {
    try {
      return await blogCategoryService.getABlogCategory(bCatId)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateBlogCategory = createAsyncThunk(
  "blogcategories/updateblogcategory",
  async (data, thunkApi) => {
    try {
      return await blogCategoryService.updateABlogCategory(data)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteBlogCategory = createAsyncThunk(
  "blogcategories/deleteblogcategory",
  async (bCatId, thunkApi) => {
    try {
      return await blogCategoryService.deleteABlogCategory(bCatId)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all")


const initialstate = {
  blogcategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const blogCategorySlice = createSlice({
  name: "blogcategories",
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogcategories = action.payload;
      })
      .addCase(getBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogcategories = [];
        state.message = action.error.message;
      })
      .addCase(createBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdblogcategory = action.payload;
      })
      .addCase(createBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.createdblogcategory = [];
        state.message = action.error.message;
      })
      .addCase(getBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogTitle = action.payload.title;
      })
      .addCase(getBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogTitle = [];
        state.message = action.error.message;
      })
      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlogCategory = action.payload;
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.updatedBlogCategory = [];
        state.message = action.error.message;
      })
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlogCategory = action.payload;
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.deletedBlogCategory = [];
        state.message = action.error.message;
      })
      .addCase(resetState, () => initialstate)
  },
});

export default blogCategorySlice.reducer;