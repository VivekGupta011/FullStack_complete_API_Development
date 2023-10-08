const bcrypt = require("bcrypt");
const crypto = require("crypto");
const uniqid = require("uniqid");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const generateToken = require("../config/jwtToken");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const generateRefreshToken = require("../config/refreshToken");
const sendMail = require("./emailController");

//Create A User
const createUser = asyncHandler(async (req, res) => {
  const saltRound = 10;
  const { firstname, lastname, email, mobile, password } = req.body;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const salt = bcrypt.genSaltSync(saltRound);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      mobile: mobile,
      password: hashPassword,
    });
    return res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

//Update A User
const UpdateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  const { firstname, lastname, email, mobile } = req.body;
  try {
    const findUpdateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        mobile: mobile,
      },
      {
        new: true,
      }
    );
    return res.json(findUpdateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Login A User
const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  const match = bcrypt.compareSync(password, findUser.password);
  if (findUser && match) {
    const refreshToken = generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 100,
    });
    return res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//Admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email: email });
  const match = bcrypt.compareSync(password, findAdmin.password);
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && match) {
    const refreshToken = generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin?._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 100,
    });
    return res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//Refresh Token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token present in db or not match");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (error, decode) => {
    if (error || user.id !== decode.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//Logout User
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

//Get All User
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    return res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//Get A User
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const findUser = await User.findById(id);
  try {
    return res.json(findUser);
  } catch (error) {
    throw new Error("User Not Found");
  }
});

//Delete A User
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findDeleteUser = await User.findByIdAndDelete(id);
    return res.json(findDeleteUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Blcok User
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Unblock User
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unBlock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User Unblocked",
    });
  } catch (error) {}
});

const updatePassword = asyncHandler(async (req, res) => {
  const saltRound = 10;
  const { id } = req.user;
  console.log(id);
  const { password } = req.body;
  validateMongoDbId(id);
  const user = await User.findById(id);
  if (password) {
    const salt = bcrypt.genSaltSync(saltRound);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;
    const resettoken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");
    user.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    const updatePass = await user.save();
    res.json(updatePass);
  } else {
    res.json(user);
  }
});

const forgetPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const resettoken = crypto.randomBytes(32).toString("hex");
    const token = crypto.createHash("sha256").update(resettoken).digest("hex");
    await User.findByIdAndUpdate(
      user?._id,
      {
        passwordResetToken: token,
        passwordResetExpires: Date.now() + 30 * 60 * 1000,
      },
      {
        new: true,
      }
    );

    const resetUrl = `Hi, please follow this link to reset your password. This link is valid for 10 minutes from now. <a href='http://localhost:3000/reset-password/${token}'>Click Here</a>`;
    const data = {
      to: email,
      text: "Hey, User",
      subject: "Forgot Password Link",
      html: resetUrl,
    };
    sendMail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const myPassword = req.body.password.toString();
  const { token } = req.params;
  const user = await User.findOne({ passwordResetToken: token });
  if (!user) throw new Error("Token Expired, please try again later");
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  const hashPassword = bcrypt.hashSync(myPassword, salt);
  const findUser = await User.findByIdAndUpdate(
    user?._id,
    {
      password: hashPassword,
      passwordResetToken: "",
      passwordResetExpires: "",
    },
    {
      new: true,
    }
  );
  res.json(findUser);
});

//Get Wishlist
const getWishList = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const finduser = await User.findById(id).populate("wishlist");
    return res.json(finduser);
  } catch (error) {
    throw new Error(error);
  }
});

//save address
const saveAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    const findUpdateUser = await User.findByIdAndUpdate(
      id,
      {
        address: req.body.address,
      },
      {
        new: true,
      }
    );
    return res.json(findUpdateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//add to cart
const userCart = asyncHandler(async (req, res) => {
  const { productId, color, quantity, price } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      color,
      price,
      quantity,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

//get user cart
const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ userId: _id })
      .populate("productId")
      .populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
//Remove Item From Cart
const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongoDbId(_id);
  try {
    const deletedcartItem = await Cart.deleteOne({
      userId: _id,
      _id: cartItemId,
    });
    res.json(deletedcartItem);
  } catch (error) {
    throw new Error(error);
  }
});

//Update Product Quantity
const updateProductQuantity = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, quantity } = req.params;
  console.log(quantity);
  validateMongoDbId(_id);
  try {
    const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId });
    cartItem.quantity = quantity;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    paymentInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
  } = req.body;
  const { _id } = req.user;
  try {
    const order = await Order.create({
      shippingInfo,
      paymentInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      user: _id,
    });
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

//Get My Orders
const getMyOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const orders = await Order.find({ user: _id })
      .populate("user")
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

//empty user cart
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const deletedcart = await Cart.deleteMany({ userId: _id });
    res.json(deletedcart);
  } catch (error) {
    throw new Error(error);
  }
});

//Get Monthly Statics

const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let endDate = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1)
    endDate=months[d.getMonth()] + " " + d.getFullYear()
  }
  
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate)
        }
      }
    },
    {
      $group: {
        _id: {month: "$month"},
        amount: { $sum: "$totalPriceAfterDiscount"},
        count: {$sum: 1}
      }
    }
  ])
  res.json(data)
});

//Get Yearly Total Order
const getYearlyTotalOrders = asyncHandler(async (req, res) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let endDate = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1)
    endDate=months[d.getMonth()] + " " + d.getFullYear()
  }
  
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate)
        }
      }
    },
    {
      $group: {
        _id:  null,
        count: {
          $sum: 1
        },
        amount: {
          $sum: "$totalPriceAfterDiscount"
        }
      }
    }
  ])
  res.json(data)
});

//Get All Orders
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user")
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

//Get Single Order
const getSingleOrder = asyncHandler(async (req, res) => {
      const { id } = req.params;
      validateMongoDbId(id)
      try {
          const userOrders = await Order.findOne({_id: id}).populate('orderItems.product').populate('orderItems.color').populate('user').exec()
          res.json(userOrders)
      } catch (error) {
          throw new Error(error)
      }
  })

  //Update Order Status
  const updateOrderStatus = asyncHandler(async (req, res) => {
        const { status } = req.body
        const { id } = req.params
        try {
            const updateStatus = await Order.findByIdAndUpdate(id,
                {
                  orderStatus: status,
                }, { new: true })
                res.json(updateStatus)
        } catch (error) {
            throw new Error(error)
        }
    })

// //apply coupon
// const applyCoupon = asyncHandler(async (req, res) => {
//     const { coupon } = req.body
//     const { _id } = req.user
//     validateMongoDbId(_id)
//     const validateCoupon = await Coupon.findOne({ name: coupon })
//     if (!validateCoupon) {
//         throw new Error("Invalid Coupon")
//     }

//     const user = await User.findOne({ _id })
//     const { products, cartTotal } = await Cart.findOne({ orderBy: user?._id }).populate("products.product")
//     let totalAfterDiscount = (cartTotal - (cartTotal * validateCoupon.discount / 100)).toFixed(2)
//     await Cart.findOneAndUpdate({ orderBy: user?._id }, {
//         totalAfterDiscount: totalAfterDiscount
//     }, {
//         new: true
//     })
//     res.json(totalAfterDiscount)
// })

// //create order
// const createOrder = asyncHandler(async (req, res) => {
//     const { id } = req.user
//     validateMongoDbId(id)
//     const { COD, couponApplied } = req.body
//     try {
//         if (!COD) throw new Error("Create cash order failed")
//         const user = await User.findById(id)
//         let userCart = await Cart.findOne({ orderBy: user?._id })
//         let finalAmount = 0
//         if (couponApplied && userCart.totalAfterDiscount) {
//             finalAmount = userCart.totalAfterDiscount
//         } else {
//             finalAmount = userCart.cartTotal
//         }

//         let newOrder = await new Order({
//             products: userCart.products,
//             paymentIntent: {
//                 id: uniqid(),
//                 method: "COD",
//                 amount: finalAmount,
//                 status: "Cash on Delivery",
//                 created: Date.now(),
//                 currency: "usd"
//             },
//             orderBy: user?._id,
//             orderStatus: "Cash on Delivery",
//         }).save()
//         let update = userCart.products.map((item) => {
//             return {
//                 updateOne: {
//                     filter: { _id: item.product._id },
//                     update: { $inc: { quantity: -item.count, sold: +item.count } }
//                 }
//             }
//         })
//         const updated = await Product.bulkWrite(update, {})
//         res.json({ message: "success" })
//     } catch (error) {
//         throw new Error(error)
//     }
// })

// const getOrders = asyncHandler(async (req, res) => {
//     const { id } = req.user
//     validateMongoDbId(id)
//     try {
//         const userOrders = await Order.findOne({ orderBy: id }).populate('products.product').populate('orderBy').exec()
//         res.json(userOrders)
//     } catch (error) {
//         throw new Error(error)
//     }
// })

// const getAllOrders = asyncHandler(async (req, res) => {
//     try {
//         const allUserOrders = await Order.find({ }).populate('products.product').populate('orderBy').exec()
//         res.json(allUserOrders)
//     } catch (error) {
//         throw new Error(error)
//     }
// })

// const getOrderByUserId = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     validateMongoDbId(id)
//     try {
//         const userOrders = await Order.findOne({ orderBy: id }).populate('products.product').populate('orderBy').exec()
//         res.json(userOrders)
//     } catch (error) {
//         throw new Error(error)
//     }
// })

// const updateOrderStatus = asyncHandler(async (req, res) => {
//     const { status } = req.body
//     const { id } = req.params
//     try {
//         const updateStatus = await Order.findByIdAndUpdate(id,
//             {
//                 orderStatus: status,
//                 paymentIntent: {
//                     status: status,
//                 }
//             }, { new: true })
//             res.json(updateStatus)
//     } catch (error) {
//         throw new Error(error)
//     }
// })

module.exports = {
  createUser,
  UpdateUser,
  loginUserController,
  handleRefreshToken,
  logout,
  getAllUser,
  getUser,
  deleteUser,
  blockUser,
  unblockUser,
  updatePassword,
  forgetPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  createOrder,
  getMyOrders,
  emptyCart,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  removeProductFromCart,
  updateProductQuantity,
};
