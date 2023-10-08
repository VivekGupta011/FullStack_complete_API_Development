import {createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authService from './userService';


export const registerUser = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const loginUser = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserProductWishlist = createAsyncThunk("auth/getuserwishlist", async (thunkAPI) => {
    try {
        return await authService.getUserWishlist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToCart = createAsyncThunk("auth/addcart",  async (product, thunkAPI) => {
    try {
        return await authService.addProductToCart(product)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUserCart = createAsyncThunk("auth/getcart",  async (thunkAPI) => {
    try {
        return await authService.getAUserCart()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCartProduct = createAsyncThunk("auth/delete-cart-product",  async (cartItemId, thunkAPI) => {
    try {
        return await authService.removeCartItem(cartItemId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateQuantity = createAsyncThunk("auth/update-quantity",  async (cartDetail, thunkAPI) => {
    try {
        return await authService.updateCartQuantity(cartDetail)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createUserOrder = createAsyncThunk("auth/createorder",  async (orderDetail, thunkAPI) => {
    try {
        return await authService.createOrder(orderDetail)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getUserOrders = createAsyncThunk("auth/getuserorders",  async (thunkAPI) => {
    try {
        return await authService.userOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateUser = createAsyncThunk("auth/updateuser",  async (userData, thunkAPI) => {
    try {
        return await authService.updateAUser(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const forgotPassword = createAsyncThunk("auth/forgotpassword",  async (email, thunkAPI) => {
    try {
        return await authService.forgotAPassword(email)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const changePassword = createAsyncThunk("auth/changepassword",  async (data, thunkAPI) => {
    try {
        return await authService.changeAPassword(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const emptyUserCart = createAsyncThunk("auth/emptycart",  async (thunkAPI) => {
    try {
        return await authService.emptyCart()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all")


const getCustomerFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialstate = {
    user: getCustomerFromLocalStorage,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}
const authSlice = createSlice({
    name: "auth",
    initialState: initialstate,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdUser = action.payload;
            if(state.isSuccess === true){
                toast.info("User Created Successfully")
            }
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.createdUser = [];
            state.message = action.error;
            if(state.isError === true){
                toast.error(action.payload.response.data.message)
            }
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
            if(state.isSuccess === true){
                localStorage.setItem("token", action.payload.token)
                toast.info("User Logged In Successfully")
            }
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = [];
            state.message = action.error;
            if(state.isError === true){
                toast.error(action.payload.response.data.message)
            }
        })
        .addCase(getUserProductWishlist.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserProductWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.userWishlist = action.payload;
        })
        .addCase(getUserProductWishlist.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.userWishlist = [];
            state.message = action.error;
        })

        .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.userCart = action.payload;
            if(state.isSuccess === true){
                toast.success("Product Added To Cart Successfully")
            }
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.userCart = [];
            state.message = action.error;
            if(state.isError === true){
                toast.error("Fail To Add Product To Cart", action.error)
            }
        })
        .addCase(getUserCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.cart = action.payload;
        })
        .addCase(getUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.cart = [];
            state.message = action.error;
        })
        .addCase(deleteCartProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteCartProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deletedCartItem = action.payload;
            if(state.isSuccess === true){
                toast.success("Cart Item Deleted Successfully")
            }
        })
        .addCase(deleteCartProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.deletedCartItem = [];
            state.message = action.error;
            if(state.isError === true){
                toast.error("Fail To Delete Cart Item", action.error)
            }
        })
        .addCase(updateQuantity.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateQuantity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updatedQuantity = action.payload;
            if(state.isSuccess === true){
                toast.success("Cart quantity updated successfully")
            }
        })
        .addCase(updateQuantity.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.updatedQuantity = [];
            state.message = action.error;
            if(state.isSuccess === false){
                toast.error("Fail to update cart quantity")
            }
        })

        .addCase(createUserOrder.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createUserOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createdOrder = action.payload;
            if(state.isSuccess === true){
                toast.success("User order place successfully")
            }
        })
        .addCase(createUserOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.createdOrder = [];
            state.message = action.error;
            if(state.isSuccess === false){
                toast.error("Fail to place user order")
            }
        })
        .addCase(getUserOrders.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.userOrders = action.payload;
        })
        .addCase(getUserOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.userOrders = [];
            state.message = action.error;
        })
        .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updatedUser = action.payload;
                let currentUserData = JSON.parse(localStorage.getItem("customer"))
                let currentData = {
                    _id: currentUserData?._id,
                    token: currentUserData?.token,
                    firstname: action?.payload?.firstname,
                    lastname: action?.payload?.lastname,
                    email: action?.payload?.email,
                    mobile: action?.payload?.mobile,
                }
                localStorage.setItem("customer", JSON.stringify(currentData))
                state.user = currentData
                toast.success("Profile Updated Successfully")
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.updatedUser = [];
            state.message = action.payload.error.message
            if(state.isError === true){
                toast.error(action.payload.response.data.message)
            }
        })
        .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.passwordToken = action.payload;
            if(state.isSuccess === true){
                toast.success("Forgot Password Email Sent Successfully")
            }
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.passwordToken = [];
            state.message = action.error;
            if(state.isError === true){
                toast.error("Something Went Wrong")
            }
        })
        .addCase(changePassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(changePassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.changedPassword = action.payload;
            if(state.isSuccess === true){
                toast.success("Password Change Successfully")
            }
        })
        .addCase(changePassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.changedPassword = [];
            state.message = action.error;
            if(state.isError === true){
                toast.error("Something Went Wrong")
            }
        })
        .addCase(emptyUserCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(emptyUserCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.emptyCart = action.payload;
            // if(state.isSuccess === true){
            //     toast.success("Cart Empty Successfully")
            // }
        })
        .addCase(emptyUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.emptyCart = [];
            state.message = action.error;
            // if(state.isError === true){
            //     toast.error(action.payload.response.data.message)
            // }
        })
        .addCase(resetState, () => initialstate)
    }
})


export default authSlice.reducer;