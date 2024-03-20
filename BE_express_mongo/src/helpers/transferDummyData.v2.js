"use strict";

const axios = require("axios");
const { Product, ProductCategory } = require("../models/product.model");
const User = require("../models/user.model");

let dummyCategories = [];
let dummyProducts = [];
let dummyUsers = [];

//? KATEGORİ METODLARI
async function getProductCategories() {
  const { data } = await axios(`https://dummyjson.com/products/categories`);
  return data;
}

async function createProductCategory(category) {
  try {
    await ProductCategory.create({ name: category });
  } catch (err) {
    console.error("Ürün kategorisi oluşturulurken hata:", err.message);
  }
}

async function populateCategories() {
  dummyCategories = await getProductCategories();
  for (const category of dummyCategories) {
    await createProductCategory(category); // Hata yönetimi için döngü kullanın
  }
}

//? ÜRÜN METODLARI

async function getProducts() {
  const { data } = await axios(`https://dummyjson.com/products?limit=100`);
  return data.products;
}

async function createProducts() {
  const productChunks = [...dummyProducts].splice(0, 100); // Ürünleri işleme al
  while (productChunks.length > 0) {
    try {
      await Product.insertMany(productChunks.shift()); // Mümkünse insertMany kullanın
    } catch (err) {
      console.error("Ürünler oluşturulurken hata:", err.message);
    }
  }
}

async function populateProducts() {
  dummyProducts = await getProducts();
  await createProducts();
}

//? KULLANICI METODLARI

const getDummyUsers = async () => {
  const { data } = await axios.get(`https://dummyjson.com/users`);
  return data.users;
};

async function populateUsers() {
  const userPromises = dummyUsers.map(async (user) => User.create(user));
  await Promise.all(userPromises);
}

//? VERİTABANI TEMİZLEME METODLARI

async function cleanCollections() {
  await ProductCategory.deleteMany({}); // Kategorileri temizle
  await Product.deleteMany({}); // Ürünleri temizle
  await User.deleteMany({}); // Kullanıcıları temizle
}

//? ANA FONKSİYON

module.exports = async () => {
  try {
    await cleanCollections();

    await getProductCategories();
    await populateCategories();

    await getProducts();
    await populateProducts();

    await getDummyUsers();
    await populateUsers();
  } catch (err) {
    console.error("Veritabanı doldurulurken hata:", err.message);
  }
};
