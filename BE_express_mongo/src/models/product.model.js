"use strict";
/*-------------------------------------------------------
 STORE APP - PRODUCT MODEL
-------------------------------------------------------*/
const mongoose = require("mongoose");
const { isURL } = require("validator");

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    
    },
  },

  {
    collection: "productCategory",
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productCategory",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    discountPercentage: {
      type: Number,
      trim: true,
    },
    rating: {
      type: Number,
      trim: true,
    },
    stock: {
      type: Number,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
      validate: [isURL, "Please enter a valid URL"],
    },
    images: [
      {
        type: String,
        validate: [isURL, "Please enter a valid URL"],
      },
    ],
  
  },

  {
    collection: "product",
    timestamps: true,
  }
);

module.exports = {
  ProductCategory: mongoose.model("productCategory", productCategorySchema),
  Product: mongoose.model("product", productSchema),
};
