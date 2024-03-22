"use strict";
/*-------------------------------------------------------
 STORE APP - PRODUCT ROUTER
-------------------------------------------------------*/
const router = require("express").Router();

const { AdminProductCategory, AdminProduct } = require("../controllers/admin.controller");

router
  .route("/categories")
  .get(AdminProductCategory.list)
  .post(AdminProductCategory.create);
router
  .route("/categories/:categoryId")
  .get(AdminProductCategory.read)
  .put(AdminProductCategory.update) // put patch aynı
  .patch(AdminProductCategory.update)
  .delete(AdminProductCategory.delete);
  
router
  .route("/products")
  .get(AdminProduct.list)
  .post(AdminProduct.create);
router
  .route("/products/:productId")
  .get(AdminProduct.read)
  .put(AdminProduct.update) // put patch aynı
  .patch(AdminProduct.update)
  .delete(AdminProduct.delete);



module.exports = router;
