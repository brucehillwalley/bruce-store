"use strict";
/*-------------------------------------------------------
    EXPRESSJS - MONGODB Connection Mongoose
-------------------------------------------------------*/

const mongoose= require("mongoose");

const MONGODB = process.env.MONGODB;

mongoose.connect(MONGODB)
    .then(() => console.log("MongoDB connection established"))
    .catch((err) => console.log("MongoDB connection error", err));

