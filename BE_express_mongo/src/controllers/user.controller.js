"use strict";
/*-------------------------------------------------------
   STORE APP - USER CONTROLLER
-------------------------------------------------------*/
require("express-async-errors");

const User = require("../models/user.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    const data = await User.find();
    res.status(200).send({
      error: false,
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body);
    const newdata = await User.find({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      data: data,
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email });
      if (user && user.password == passwordEncrypt(password)) {

        //? SESSION login olan kullanıcı bilgileri sessiona aktarılır tarayıcı kapanırsa oturum kapatılır
        req.session ={
          email:user.email,
          password:user.password
        }

        
        //? COOKIES login olan kullanıcı bilgileri cookies e aktarılır belirtilen süre kadar saklanır.
        if(req.body?.remindMe){
          req.session.remindMe=req.body.remindMe
            // Set maxAge in milliseconds
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 *3 // 3 days
        }


        res.status(200).send({
          error: false,
          message: "Login successful!",
          user,

        })

      } else {
        res.errorStatusCode = 401;
        throw new Error("Login parameters not correct!");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password are required!");
    }
  },

  //? COOKIES ve SESSION daki veriler logout olunca  silinir
  logout: async (req, res) => {
      req.session = null
      
      res.status(200).send({
        error: false,
        message: "Logout successful!",
        

      })
  },
};
