"use strict";
/*-------------------------------------------------------
 STORE APP - PRODUCT CONTROLLER
-------------------------------------------------------*/

// require("express-async-errors"); //gerek yok index te yaz yeterli
// 

const { ProductCategory, Product } = require("../models/product.model");
//! burada modelimizi cagirdik. ben baş harfi küçük require yaptığım için hata aldım. nasıl export ettiğine nası require ettiğine dikkat et

module.exports.AdminProductCategory = {
  list: async (req, res) => {
    const data = await ProductCategory.find();
    res.status(200).send({
      error: false,
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
      req.body, { runValidators: true }
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

module.exports.AdminProduct = {
  list: async (req, res) => {
    const data = await Product.find();
    res.status(200).send({
      error: false,
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
    const data = await Product.findOne({ _id: req.params.productId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },

  update: async (req, res) => {
    const data = await Product.updateOne(
      { _id: req.params.productId },
      req.body, {runValidators:true}
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
