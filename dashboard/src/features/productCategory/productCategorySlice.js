import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";


export const getProductCategory = createAsyncThunk(
  "productcategories/getallproductcategory",
  async (thunkApi) => {
    try {
      return await productCategoryService.fetchProductCategory();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createProductCategories = createAsyncThunk(
  "productcategories/createproductcategory",
  async (categoryData,thunkApi) => {
    try {
      return await productCategoryService.createProductCategory(categoryData)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getProductCategoryById = createAsyncThunk(
  "productcategories/getproductcategorybyid",
  async (id, thunkApi) => {
    try {
      return await productCategoryService.getProductCategoryById(id)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateProductCategory = createAsyncThunk(
  "productcategories/updateproductcategory",
  async (category, thunkApi) => {
    try {
      return await productCategoryService.updateProductCategory(category)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteProductCategory = createAsyncThunk(
  "productcategories/deleteproductcategory",
  async (categoryId, thunkApi) => {
    try {
      return await productCategoryService.deleteProductCategory(categoryId)
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all")

const initialstate = {
  productcategories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};



const productCategorySlice = createSlice({
    name: 'productcategories',
    initialState: initialstate,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProductCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProductCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.productcategories = action.payload
        })
        .addCase(getProductCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.productcategories = [];
            state.message = action.error.message;
        })
        .addCase(createProductCategories.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(createProductCategories.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.createdProductCategory = action.payload
      })
      .addCase(createProductCategories.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.createdProductCategory = [];
          state.message = action.error.message;
      })
      .addCase(getProductCategoryById.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getProductCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categoryName = action.payload.title;
    })
    .addCase(getProductCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.categoryName = [];
        state.message = action.error.message;
    })
    .addCase(updateProductCategory.pending, (state) => {
      state.isLoading = true;
  })
  .addCase(updateProductCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.updatedPCategory = action.payload;
  })
  .addCase(updateProductCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.updatedPCategory = [];
      state.message = action.error.message;
  })
  .addCase(deleteProductCategory.pending, (state) => {
    state.isLoading = true;
})
.addCase(deleteProductCategory.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
    state.deletedPCategory = action.payload;
})
.addCase(deleteProductCategory.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.deletedPCategory = [];
    state.message = action.error.message;
})
      .addCase(resetState, () => initialstate)
    }
})

export default productCategorySlice.reducer;
