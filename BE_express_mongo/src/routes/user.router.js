"use strict";
/*-------------------------------------------------------
   STORE APP - USER ROUTER 
-------------------------------------------------------*/
const router = require("express").Router();

const User = require("../controllers/user.controller");

  //login -logout üstte olmalı yoksa /userId ile karışır hata verir
router.post("/login",require("../middlewares/corsPost") ,User.login)
router.post("/logout",require("../middlewares/corsPost"),User.logout) //all ile tüm isteklerle logout yapılabilir

router
    .route("/")
    .get(User.list)
    .post(User.create);

router
  .route("/:userId")
  .get(User.read)
  .put(User.update)
  .patch(User.update)
  .delete(User.delete);



module.exports = router;
