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
require('./src/configs/dbConnection');

app.all('/', (req, res) => {
  res.send('WELCOME BRUCE STORE API ')
})












app.use('/users', require('./src/routes/user.router'));
app.use('/products', require('./src/routes/product.router'));


app.use(require('./src/middlewares/errorHandler')) // aşağıda kalsın
app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
