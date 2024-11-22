const express = require("express");
const {
  createUser,
  login,
  getAllUser,
  getaUser,
  deleteaUser,
  updateaUser,
  unblockUser,
  blockUser,
  handleRefreshToken,
  resetPassword,
  logout,
  updatePassword,
  forgotPassword,
  saveAddress,
  userCart,

  getOrderByUserId,
  updateOrderStatus,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  getAllOrders,
  loginAdmin,
  getWishlist,
  removeproductcart,
  updateProductQty,getMonthWiseOrderIncome,
  getMyOrder,getYearlyTotalOrders
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { checkout, paymentVerification } = require("../controller/paymentController");

const router = express.Router();

// Define the route for user registration
router.post("/register", createUser);
router.post("/login", login);
router.post("/admin-login", loginAdmin);

router.get("/getAllUsers", getAllUser);
router.get("/getauser", authMiddleware, getaUser);
router.delete("/delete-user", authMiddleware, isAdmin, deleteaUser);
router.put("/edit-User", authMiddleware, updateaUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

router.put("/save-adress", authMiddleware, saveAddress);
router.post("/forgotpassword-token", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);

router.post("/cart", authMiddleware, userCart);
router.get("/cart", authMiddleware, getUserCart);
router.get("/wishlist", authMiddleware, getWishlist);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/get-orders", authMiddleware, getOrders);
router.delete(
  "/delete-cart-product/:cartItemId",
  authMiddleware,
  removeproductcart
);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getOrderByUserId);

router.get("/getmonthwise",authMiddleware,getMonthWiseOrderIncome);
// router.get("/getmonthwiseOrdercount",authMiddleware,getMonthWiseOrderCount)
router.get("/getYearlyTotalOrders",authMiddleware,getYearlyTotalOrders)
getYearlyTotalOrders
router.delete("/empty-cart", authMiddleware, emptyCart);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
router.put("/update-product-qty/:cartItemId/:newQty",authMiddleware,updateProductQty)

router.post("/order/checkout",authMiddleware,checkout);
router.post("/order/paymentVerification",authMiddleware,paymentVerification)
router.get("/getmyorder",authMiddleware,getMyOrder)

// Export the router module
module.exports = router;
