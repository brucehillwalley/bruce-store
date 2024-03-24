"use strict";
/*-------------------------------------------------------
 STORE APP - PRODUCT CONTROLLER
-------------------------------------------------------*/

// require("express-async-errors"); //gerek yok index te yaz yeterli
//

const { ProductCategory, Product } = require("../models/product.model");
const { search } = require("../routes/user.router");
//! burada modelimizi cagirdik. ben baş harfi küçük require yaptığım için hata aldım. nasıl export ettiğine nası require ettiğine dikkat et

module.exports.ProductCategory = {
  list: async (req, res) => {
    // const data = await ProductCategory.find();
    const data = await res.getModelList(ProductCategory);

    res.status(200).send({
      error: false,
      details:await res.getModelListDetails(ProductCategory),
      data: data,
    });
  },

  create: async (req, res) => {
    const data = await ProductCategory.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await ProductCategory.find({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },

  update: async (req, res) => {
    const data = await ProductCategory.updateOne(
      { _id: req.params.categoryId },
      req.body,
      { runValidators: true }
    );
    const newdata = await ProductCategory.find({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },

  delete: async (req, res) => {
    const data = await ProductCategory.deleteOne({
      _id: req.params.categoryId,
    });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

module.exports.Product = {
  list: async (req, res) => {
    

    const data = await res.getModelList(Product, "categoryId");

    res.status(200).send({
      error: false,
      details:await res.getModelListDetails(Product),
      data: data,
    });
  },

  create: async (req, res) => {
    const data = await Product.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await Product.findOne({ _id: req.params.productId }).populate("categoryId");
    res.status(202).send({
      error: false,
      data: data,
    });
  },

  update: async (req, res) => {
    const data = await Product.updateOne(
      { _id: req.params.productId },
      req.body,
      { runValidators: true }
    );
    const newdata = await Product.find({ _id: req.params.productId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },

  delete: async (req, res) => {
    const data = await Product.deleteOne({
      _id: req.params.productId,
    });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
