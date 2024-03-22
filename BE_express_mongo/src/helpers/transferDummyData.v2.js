"use strict";

const axios = require("axios");
const { Product, ProductCategory } = require("../models/product.model");
const User = require("../models/user.model");

// https://dummyjson.com/products/categories
// https://dummyjson.com/products?limit=100
// https://dummyjson.com/users

let dummyCategories = [];
let dummyProducts = [];
let dummyUsers = [];

async function getProductCategories() {
  const { data } = await axios(`https://dummyjson.com/products/categories`);
  // dummyCategories= data
  // console.log(dummyCategories);
  return data;
}

async function createProductCategories() {
  const categoryPromises = dummyCategories.map(async (category) => {
    await ProductCategory.create({ name: category });
  });

  await Promise.all(categoryPromises);
}

async function populateCategories() {
  dummyCategories = await getProductCategories();
  await createProductCategories();
}

// products

async function getProducts() {
  const { data } = await axios(`https://dummyjson.com/products?limit=100`);
  return data.products;
}

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

const getDummyUsers = async () => {
  const { data } = await axios.get(`https://dummyjson.com/users`);
  // console.log(data.users);
  return data.users;
};

// const populateUsers = async () => {
//   dummyUsers = await getDummyUsers();
//? // insertMany olduğu için tek bir async işlem var döngüye ihtiyaç yok.
//   await User.insertMany([            
//     { email: "admin@aa.com", password: "admin", firstName: "Admin",
//     lastName: "Adminson" },
//     ...(dummyUsers),
//   ]);
// };
const populateUsers = async () => {
  dummyUsers = await getDummyUsers();
  await User.create({
     email: "admin@aa.com", password: "admin", firstName: "Admin",
        lastName: "Adminson" 
  })
  dummyUsers.forEach(async(user) => {
    await User.create({
      ...user
    })
  });
};





async function cleanCollections() {
  await ProductCategory.deleteMany({}); // Kategorileri temizler
  await Product.deleteMany({}); // Urunleri temizler
  await User.deleteMany({}); // Kullanıcıları temizler
}




module.exports = async () => {

  await cleanCollections();

  await getProductCategories();
  await populateCategories();

  await getProducts();
  await populateProducts();

  await getDummyUsers();
  await populateUsers();
};
