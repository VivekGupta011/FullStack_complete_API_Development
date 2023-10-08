const express = require("express");
const {
  createUser,
  loginUserController,
  getUser,
  getAllUser,
  deleteUser,
  UpdateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgetPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  createOrder,
  getAllOrders,
  removeProductFromCart,
  updateProductQuantity,
  getMyOrders,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  getSingleOrder,
  updateOrderStatus,
} = require("../controllers/userController");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleWare");
const {
  checkout,
  paymentVerification,
} = require("../controllers/paymentController");

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUserController);
authRouter.post("/loginadmin", loginAdmin);
authRouter.post("/forgot-password-token", forgetPasswordToken);
authRouter.post("/cart", authMiddleWare, userCart);
authRouter.post("/order/checkout", authMiddleWare, checkout);
authRouter.post(
  "/order/paymentverification",
  authMiddleWare,
  paymentVerification
);
// authRouter.post('/cart/applycoupon', authMiddleWare, applyCoupon)
authRouter.post("/cart/cash-order", authMiddleWare, createOrder);
authRouter.get("/refresh", handleRefreshToken);
authRouter.get("/logout", logout);
authRouter.get("/all-user", getAllUser);
authRouter.get("/getwishlist", authMiddleWare, getWishList);
authRouter.get("/getcart", authMiddleWare, getUserCart);
authRouter.get("/getmyorders", authMiddleWare, getMyOrders);
authRouter.get("/getmonthwiseorderincome", authMiddleWare, getMonthWiseOrderIncome);
authRouter.get("/getyearlytotalorders", authMiddleWare, getYearlyTotalOrders);
authRouter.get('/allorders', authMiddleWare, isAdmin, getAllOrders)
authRouter.get('/getsingleorder/:id', authMiddleWare, isAdmin, getSingleOrder)

//authRouter.get("/getmonthwiseordercount", authMiddleWare, getMonthWiseOrderCount);
// authRouter.get('/getorders', authMiddleWare, getOrders)

authRouter.get("/:id", authMiddleWare, isAdmin, getUser);
authRouter.delete("/emptycart", authMiddleWare, emptyCart);
authRouter.delete(
  "/delete-cart-product/:cartItemId",
  authMiddleWare,
  removeProductFromCart
);
authRouter.delete("/:id", deleteUser);
authRouter.put("/update-user", authMiddleWare, UpdateUser);
authRouter.put("/block-user/:id", authMiddleWare, isAdmin, blockUser);
authRouter.put("/unblock-user/:id", authMiddleWare, isAdmin, unblockUser);
authRouter.put("/password", authMiddleWare, updatePassword);
authRouter.put("/reset-password/:token", resetPassword);
authRouter.put("/saveaddress", authMiddleWare, saveAddress);
authRouter.put('/order/update-order-status/:id', authMiddleWare, isAdmin, updateOrderStatus)
authRouter.put("/update-user", authMiddleWare, UpdateUser);
authRouter.put(
  "/update-quantity/:cartItemId/:quantity",
  authMiddleWare,
  updateProductQuantity
);

module.exports = authRouter;
