"use strict";
/*-------------------------------------------------------
   STORE APP - EXPRESSJS - MONGODB
-------------------------------------------------------*/

const express = require("express");
const app = express();

app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

/* DB connection  */
require('./src/dbConnection');















app.use('/products', require('./src/routes/product.router'));

app.use(require('./src/errorHandler')) // aşağıda kalsın
app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
