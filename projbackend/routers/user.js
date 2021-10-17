const express = require("express");
const router = express.Router();
const{GetUserById,getUser,UpdateUser,userPurchaseList} = require("../controllers/user");
const{isAdmin,isSignIn,isAuthenicated}  = require("../controllers/auth");

router.param("UserId",GetUserById);

router.get("/user/:UserId",isSignIn,isAuthenicated,getUser);

router.put("/user/:UserId",isSignIn,isAuthenicated,UpdateUser)

router.get("/orders/user/:UserId",isSignIn,isAuthenicated,userPurchaseList);




module.exports = router