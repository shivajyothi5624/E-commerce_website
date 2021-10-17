const express = require("express");
const router = express.Router();


const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory
} = require("../controllers/category");
const {isSignIn,isAuthenicated,isAdmin} = require("../controllers/auth");
const { GetUserById } = require("../controllers/user");

//params
router.param("UserId", GetUserById);
router.param("categoryId", getCategoryById);

//actual routers goes here

//create
router.post(
  "/category/create/:UserId",
  isSignIn,
  isAuthenicated,
  isAdmin,
  createCategory
);

//read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//update
router.put(
  "/category/:categoryId/:UserId",
  isSignIn,
  isAuthenicated,
  isAdmin,
  updateCategory
);

//delete

router.delete(
  "/category/:categoryId/:UserId",
  isSignIn,
  isAuthenicated,
  isAdmin,
  removeCategory
);

module.exports = router;
