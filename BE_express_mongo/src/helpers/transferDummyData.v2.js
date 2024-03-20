"use strict";

const axios = require("axios");
const { Product, ProductCategory } = require("../models/product.model");



// https://dummyjson.com/products/categories
// https://dummyjson.com/products?limit=100

let dummyCategories = [];
let dummyProducts = [];


async function getProducts() {
  const { data } = await axios(`https://dummyjson.com/products?limit=1`);
  console.log(data);
  return data.products;
}

getProducts();

async function createProducts() {
  const productPromises = dummyProducts.map(async (product) => {
    await Product.create({
      ...product,
      categoryId: (
        await ProductCategory.findOne({ name: product.category })
      )._id,
    });
  });

  await Promise.all(productPromises);
}
async function populateProducts() {
  dummyProducts = await getProducts();
  await createProducts();
}

async function getProductCategories() {
  const { data } = await axios(`https://dummyjson.com/products/categories`);
  return data;
}

// async function createProductCategory(category) {
//   try {
//     await ProductCategory.create({ name: category });
//   } catch (err) {
//     console.error(`Ürün kategorisi oluşturulurken hata: ${err.message}`);
//   }
// }

async function populateCategories() {
  dummyCategories = await getProductCategories();
  await createProductCategories();
}

async function createProductCategories() {
  const categoryPromises = dummyCategories.map(async (category) => {
    await ProductCategory.create({ name: category });
  });

  await Promise.all(categoryPromises);
}

async function cleanCollections() {
  await ProductCategory.deleteMany({}); // Kategorileri temizler
  await Product.deleteMany({}); // Urunleri temizler
}



module.exports = () => {
  cleanCollections();
  // getProductCategories();
  // populateCategories();
  // getProducts();
  // populateProducts();
};
