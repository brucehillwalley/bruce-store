"use strict";
/*-------------------------------------------------------
   STORE APP - USER MODEL
-------------------------------------------------------*/

const mongoose=require('mongoose')
const passwordEncrypt = require("../helpers/passwordEncrypt");
const {isEmail} = require('validator')

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


// User Schema
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        unique:true,
        required:[true, "Email is required"],
        validate:[isEmail, "Please enter a valid email"]

    },
    password:{
        type:String,
        trim:true,
        required:[true, "Password is required"],
        set:passwordEncrypt
    },

    firstName: String,

    lastName: String,
    __v:Number
    
},{
    collection:'user',
    timestamps:true
})

module.exports= mongoose.model('User', userSchema)
