"use strict";
/*-------------------------------------------------------
 STORE APP - PRODUCT MODEL
-------------------------------------------------------*/
const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
      unique: true,
      trim: true,
   

    }

  },

  { 
    collection: "productCategory",
    timestamps: true }
);

module.exports = {
  ProductCategory: mongoose.model("productCategory", productCategorySchema),

}
