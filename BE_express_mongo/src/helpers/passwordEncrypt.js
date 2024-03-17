"use strict";
/*-------------------------------------------------------
   STORE APP - PASSWORD ENCRYPTION
-------------------------------------------------------*/
// Password Encryption:
// https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest

const { pbkdf2Sync } = require("node:crypto");

const keyCode =
  process.env?.SECRET_KEY || "if env is not defined_secret_key";
const loopCount = 10_000; // 10K
const charCount = 32; // write 32 for 64
const encType = "sha512";

module.exports = function (password) {
  return pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString(
    "hex"
  );
};
