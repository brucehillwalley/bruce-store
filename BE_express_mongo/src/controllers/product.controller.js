"use strict";
/*-------------------------------------------------------
 STORE APP - PRODUCT CONTROLLER
-------------------------------------------------------*/

require("express-async-errors");

const { ProductCategory } = require("../models/product.model");
//! burada modelimizi cagirdik. ben baş harfi küçük require yaptığım için hata aldım. nasıl export ettiğine nası require ettiğine dikkat et

module.exports.ProductCategory = {
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
};
