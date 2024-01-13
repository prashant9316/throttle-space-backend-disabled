const express = require("express");
const router = express.Router();
const {
  addProduct,
  addAllProducts,
  getAllProducts,
  getShowingProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  updateManyProducts,
  updateStatus,
  deleteProduct,
  deleteManyProducts,
  getShowingStoreProducts,
  getAllProductApprovalRequests,
  updateApprovalStatus,
  getAllProductsForSuperAdmin,
} = require("../controller/productController");

const { isAuth, isAdmin, isSuperAdmin } = require('./../config/auth')

//add a product
router.post("/add", isAdmin, addProduct);

//add multiple products
router.post("/all", addAllProducts);

//get a product
router.post("/:id", getProductById);

//get showing products only
router.get("/show", getShowingProducts);

//get showing products in store
router.get("/store", getShowingStoreProducts);

// get all product approvals
router.get('/product-approvals', isSuperAdmin, getAllProductApprovalRequests)

//get all products
router.get("/", isAdmin, getAllProducts);


//get all products for superadmin
router.get("/all-for-admin", isSuperAdmin, getAllProductsForSuperAdmin);



//get a product by slug
router.get("/product/:slug", getProductBySlug);

//update a product
router.patch("/:id", updateProduct);

//update many products
router.patch("/update/many", updateManyProducts);

//update a product status
router.put("/status/:id", updateStatus);


//update a product status
router.put("/approval-status/:id", isSuperAdmin, updateApprovalStatus);

//delete a product
router.delete("/:id", deleteProduct);

//delete many product
router.patch("/delete/many", deleteManyProducts);

module.exports = router;
