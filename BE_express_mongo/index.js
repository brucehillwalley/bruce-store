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

/* ------------------------------------------------------- */
// SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session

const session = require('cookie-session')
app.use(session({
  secret: process.env.SECRET_KEY, //encryption key,
  // maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  //? burada global 24 saatlik cookie ayarı yaparsak oturum kapatıldığında da veri tutulur

}))
//? Check logined user
app.use(require('./src/middlewares/userControl'))



app.all('/', (req, res) => {
    if(req.isLogin){
      res.send({
    error: false,
    message: 'WELCOME BRUCE STORE API ',
    session: req.session,
    user: req.user
  })
    }else{
      res.send({
        error: false,
        message: 'WELCOME BLOG API PROJECT',
        session: req.session,
    })
    }

  

})












app.use('/users', require('./src/routes/user.router'));
app.use('/products', require('./src/routes/product.router'));
app.use('/admin',require('./src/middlewares/authentication') ,require('./src/routes/admin.router' ));


app.use(require('./src/middlewares/errorHandler')) // aşağıda kalsın
app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});



// require('./src/helpers/transferDummyData')() //dummy data transfer


// to return default values of db once in a day
const cron = require('cron');

const returnDefaultValuesDB =new cron.CronJob('59 59 23 * * *', function() { //everyday at 23.59.59 

  require('./src/helpers/transferDummyData')() //dummy data transfer

  console.log(" DB returned default values ");
}, null, true, 'Europe/Istanbul');

// https://github.com/kelektiv/node-cron/tree/main/examples

