"use strict";
/*-------------------------------------------------------
   STORE APP - EXPRESSJS - MONGODB
-------------------------------------------------------*/

const express = require("express");
const app = express();
require("express-async-errors"); // yukarıda kalsın

app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

/* DB connection  */
require('./src/configs/dbConnection');

const session = require('cookie-session')
app.use(session({
  secret: process.env.SECRET_KEY,
}))



app.all('/', (req, res) => {
  res.send('WELCOME BRUCE STORE API ')
})












app.use('/users', require('./src/routes/user.router'));
app.use('/products', require('./src/routes/product.router'));


app.use(require('./src/middlewares/errorHandler')) // aşağıda kalsın
app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});


// to return default values of db once in a day
const cron = require('cron');

const returnDefaultValuesDB =new cron.CronJob('59 59 23 * * *', function() { //everyday at 23.59.59 

  require('./src/helpers/transferDummyData')() //dummy data transfer

  console.log(" DB returned default values ");
}, null, true, 'Europe/Istanbul');

// https://github.com/kelektiv/node-cron/tree/main/examples

