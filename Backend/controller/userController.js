const { generatewebToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const Product = require("../models/productModel");
const asynHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const { generaterefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("../controller/emailController");
const crypto = require("crypto");
const createUser = asynHandler(async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user already exists
    const findUser = await User.findOne({ email });

    if (!findUser) {
      // Create a new user
      const newUser = await User.create(req.body);

      // Return success response with status 201
      return res.status(201).json({
        message: "User successfully created",
        success: true,
        user: newUser,
      });
    } else {
      // User already exists, return conflict status
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }
  } catch (error) {
    // Handle any errors
    console.error("Error creating user:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
});

const login = asynHandler(async (req, res) => {
  const { email, password } = req.body;
  //check the user exist or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordCorrect(password))) {
    const refreshToken = await generaterefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generatewebToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid credentialss..");
  }
});
//handleRefreshToken
const handleRefreshToken = asynHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) {
    throw new Error("No Refresh Token...");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new Error("No Refresh Token...");
  }
  jwt.verify(refreshToken, process.env.JWT_SCRET, (err, decode) => {
    if (err || user?._id !== decode.id) {
      throw new Error("There is something wrong");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
  res.json(user);
});

//logout

const logout = asynHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

//get all users

const getAllUser = asynHandler(async (req, res) => {
  console.log("haalo");
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// get single users

const getaUser = asynHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  validateMongodbId(_id);
  try {
    const user = await User.findOne({ _id: _id });
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a user
const deleteaUser = asynHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findByIdAndDelete(_id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// update a user

const updateaUser = asynHandler(async (req, res) => {
  console.log(req.user);

  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req.body.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//block user
const blockUser = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
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
      message: "user Blocked now",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//unblock user

const unblockUser = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user unblocked now",
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updatePassword = asynHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  const user = await User.findById(_id);
  if (user) {
    user.password = password;
    const updatepassword = await User.save();
    res.json(updatepassword);
  } else {
    res.json(user);
  }
});

const forgotPassword = asynHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found throungth thse Email");
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5173/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      subject: "Forgot Password Link",
      text: "Hey User",
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});
const resetPassword = asynHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Token Expired,please try again later");
  }
  (user.password = password), (user.passwordResetToken = undefined);
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

//save address

const saveAddress = asynHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req.body.address,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//user cart function

const userCart = asynHandler(async (req, res) => {
  const { productId, color, qauntity, price } = req.body;
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    let newCart = await new Cart({
      userId: _id,
      productId: productId,
      color,
      price,
      qauntity,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

// get user cart
const getUserCart = asynHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  validateMongodbId(_id);

  try {
    const cart = await Cart.find({ userId: _id })
      .populate("productId")
      .populate("color");

    console.log(cart);
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
const emptyCart = asynHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

//apply coupon function

const applyCoupon = asynHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  const user = await User.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderby: user._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

// const createOrder = asynHandler(async (req, res) => {
//   const { COD, couponApplied } = req.body;
//   const { _id } = req.user;
//   validateMongodbId(_id);
//   try {
//     if (!COD) throw new Error("Create cash order failed");
//     const user = await User.findById(_id);
//     let userCart = await Cart.findOne({ orderby: user._id });
//     let finalAmout = 0;
//     if (couponApplied && userCart.totalAfterDiscount) {
//       finalAmout = userCart.totalAfterDiscount;
//     } else {
//       finalAmout = userCart.cartTotal;
//     }

//     let newOrder = await new Order({
//       products: userCart.products,
//       paymentIntent: {
//         id: uniqid(),
//         method: "COD",
//         amount: finalAmout,
//         status: "Cash on Delivery",
//         created: Date.now(),
//         currency: "usd",
//       },
//       orderby: user._id,
//       orderStatus: "Cash on Delivery",
//     }).save();
//     let update = userCart.products.map((item) => {
//       return {
//         updateOne: {
//           filter: { _id: item.product._id },
//           update: { $inc: { quantity: -item.count, sold: +item.count } },
//         },
//       };
//     });
//     const updated = await Product.bulkWrite(update, {});
//     res.json({ message: "success" });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const getOrders = asynHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const userorders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asynHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByUserId = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const userorders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
    res.json(userorders);
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrderStatus = asynHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});
const loginAdmin = asynHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordCorrect(password))) {
    const refreshToken = await generaterefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generatewebToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});
const getWishlist = asynHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});
const removeproductcart = asynHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongodbId(_id);
  try {
    const deleteProductFromCart = await Cart.deleteOne({
      userId: _id,
      _id: cartItemId,
    });
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});
const updateProductQty = asynHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQty } = req.params;
  validateMongodbId(_id);
  try {
    const cartItem = await Cart.findOne({ userId: _id, _id: cartItemId });
    cartItem.qauntity = newQty;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asynHandler(async (req, res) => {
  const {
    shippingInfo,
    cartproductstate,
    totalPrice,
    totalPriceAfterDiscount,
    paymentinfo,
  } = req.body;
  console.log(req.body);
  const { _id } = req.user;
  validateMongodbId(_id);

  try {
    const order = await Order.create({
      shippingInfo,
      orderItems: cartproductstate,
      totalPrice,
      totalPriceAfterDiscount,
      paymentInfo: paymentinfo,
      user: _id,
    });

    res.json({ order, success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
const getMyOrder = asynHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongodbId(_id);
    const orders = await Order.find({ user: _id })
      .populate("user")
      .populate("orderItems.product")
      .populate("orderItems.color");
    console.log(orders);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// const getMonthWiseOrderIncome = asynHandler(async (req, res) => {
//   console.log("getMonthWiseOrderIncome")
//   try {
//     var month = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     let d = new Date();
//     let endDate = "";
//     d.setDate(1);
//     for (let index = 0; index < 11; index++) {
//       d.setMonth(d.getMonth() - 1);
//       endDate = month[d.getMonth()] + " " + d.getFullYear();
//     }
//     console.log(endDate);
//     const data = await Order.aggregate([
//       {
//         $match: {
//           createdAt: {
//             $lte: new Date(),
//             $gte: new Date(endDate),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             month: "$month",
//           },
//           amount: {
//             $sum: "$totalPriceAfterDiscount",
//           },
//           count: {
//             $sum: 1,
//           },
//         },
//       },
//     ]);
//     console.log(data)
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });
// const getMonthWiseOrderCount = asynHandler(async (req, res) => {
//   try {
//     var month = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     let d = new Date();
//     let endDate = "";
//     d.setDate(1);
//     for (let index = 0; index < 11; index++) {
//       d.setMonth(d.getMonth() - 1);
//       endDate = month[d.getMonth()] + " " + d.getFullYear();
//     }
//     console.log(endDate);
//     const data = await Order.aggregate([
//       {
//         $match: {
//           createdAt: {
//             $lte: new Date(),
//             $gte: new Date(endDate),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             month: "$month",
//           },
//           count: {
//             $sum: 1,
//           },
//         },
//       },
//     ]);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

const getYearlyTotalOrders= asynHandler(async (req, res) => {
  try {
    var month = [
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
      d.setMonth(d.getMonth() - 1);
      endDate = month[d.getMonth()] + " " + d.getFullYear();
    }
    console.log(endDate);
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: new Date(),
            $gte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id:null,
          count: {
            $sum: 1,
          },
          amount:{
            $sum:"#totalPriceAfterDiscount"
          }
        },
      },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
const getMonthWiseOrderIncome = asynHandler(async (req, res) => {

  try {
    const monthNames = [
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

    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1); // Start from 12 months ago
    let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // End at next month's start

    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $project: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          totalPriceAfterDiscount: 1,
        },
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
          },
          totalIncome: { $sum: "$totalPriceAfterDiscount" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Add month names for better readability
    const formattedData = data.map((item) => {
      const { year, month } = item._id;
      return {
        month: `${monthNames[month - 1]} ${year}`,
        totalIncome: item.totalIncome,
        orderCount: item.orderCount,
      };
    });

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = {
  createUser,
  login,
  getAllUser,
  getaUser,
  deleteaUser,
  updateaUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPassword,
  resetPassword,
  saveAddress,
  getOrderByUserId,
  getOrderByUserId,
  updateOrderStatus,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  getAllOrders,
  loginAdmin,
  getWishlist,
  removeproductcart,
  updateProductQty,
  getMyOrder,
  getMonthWiseOrderIncome
 ,getYearlyTotalOrders
};
