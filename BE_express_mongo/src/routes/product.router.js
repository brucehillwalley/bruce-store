"use strict";
/*-------------------------------------------------------
 STORE APP - PRODUCT ROUTER
-------------------------------------------------------*/
const router= require('express').Router();


const  {ProductCategory}  = require("../controllers/product.controller");

router.route('/categories')
    .get(ProductCategory.list)
    .post(ProductCategory.create);



module.exports = router;
