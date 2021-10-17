const express = require("express");
const router = express.Router();
const {isSignIn,isAuthenicated,isAdmin} = require("../controllers/auth");
const { GetUserById,pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus
} = require("../controllers/order");

//params
router.param("userId", GetUserById);
router.param("orderId", getOrderById);

//Actual routes
//create
router.post(
  "/order/create/:userId",
  isSignIn,
  isAuthenicated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);
//read
router.get(
  "/order/all/:userId",
  isSignIn,
  isAuthenicated,
  isAdmin,
  getAllOrders
);

//status of order
router.get(
  "/order/status/:userId",
  isSignIn,
  isAuthenicated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignIn,
  isAuthenicated,
  isAdmin,
  updateStatus
);

module.exports = router;



module.exports = router;