const express = require("express");
const router = express.Router();

const {isSignIn,isAuthenicated } = require("../controllers/auth");

const { getToken, processPayment } = require("../controllers/paymentb");

const { GetUserById } = require("../controllers/user");


//all of params
router.param("userId", GetUserById);
router.get("/payment/gettoken/:userId", isSignIn,isAuthenicated, getToken);

router.post(
  "/payment/braintree/:userId",
  isSignIn,
  isAuthenicated,
  processPayment
);

module.exports = router;
