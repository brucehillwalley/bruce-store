"use strict";
/*-------------------------------------------------------
    EXPRESSJS - store app - middleware - userControl
------------------------------------------------------- */
//? Bu middleware ile session'a dışardan login verileri yüklenmesi ihtimaline karşı olarak kontrol yapılır.
const User = require('../models/user.model')

module.exports = async (req, res, next) => {

    if (req?.session?.email) {

        const { email, password } = req.session

        const user = await User.findOne({ email: email })

        if (user && user.password == password) {

            req.user = user
            req.isLogin = true

        } else {

            req.session = null
            req.isLogin = false
        }
    }
    next()
}