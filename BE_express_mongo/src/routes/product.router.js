"use strict";
/*-------------------------------------------------------
 STORE APP - PRODUCT ROUTER
-------------------------------------------------------*/
const router = require("express").Router();

const { ProductCategory, Product } = require("../controllers/product.controller");

router
  .route("/categories")
  .get(ProductCategory.list)
  .post(ProductCategory.create);
router
  .route("/categories/:categoryId")
  .get(ProductCategory.read)
  .put(ProductCategory.update) // put patch aynı
  .patch(ProductCategory.update)
  .delete(ProductCategory.delete);
router
  .route("/")
  .get(Product.list)
  .post(Product.create);
router
  .route("/:productId")
  .get(Product.read)
  .put(Product.update) // put patch aynı
  .patch(Product.update)
  .delete(Product.delete);



module.exports = router;
