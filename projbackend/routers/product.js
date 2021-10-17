const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories
} = require("../controllers/product");
const {isSignIn,isAuthenicated,isAdmin} = require("../controllers/auth");
const { GetUserById } = require("../controllers/user");


//all of params
router.param("userId", GetUserById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignIn,
  isAuthenicated,
  isAdmin,
  createProduct
);

//read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);


//delete route
router.delete(
  "/product/:productId/:userId",
  isSignIn,
  isAuthenicated,
  isAdmin,
  deleteProduct
);


//update route
router.put(
  "/product/:productId/:userId",
  isSignIn,
  isAuthenicated,
  isAdmin,
  updateProduct
);

//listing route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);


module.exports = router;