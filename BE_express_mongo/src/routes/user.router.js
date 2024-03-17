"use strict";
/*-------------------------------------------------------
   STORE APP - USER ROUTER 
-------------------------------------------------------*/
const router = require("express").Router();

const User = require("../controllers/user.controller");

router.route("/")
    .get(User.list)
    .post(User.create);

router
  .route("/:userId")
  .get(User.read)
  .put(User.update)
  .patch(User.update)
  .delete(User.delete);

module.exports = router;
