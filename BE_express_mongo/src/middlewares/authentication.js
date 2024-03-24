// "use strict";
// /*-------------------------------------------------------
//     EXPRESSJS - store app - middleware - authentication
// ------------------------------------------------------- */

// const User = require("../models/user.model");

// module.exports = async (req, res, next) => {
//   if (req?.session?.email) {
//     const { email, password } = req.session;

//     if (
//       email == "admin@aa.com" &&
//       password == (await User.findOne({ email: "admin@aa.com" }))
//     ) {
//       next();
//     } else {
//       res.status(401).send({
//         error: true,
//         message: "Unauthorized access! Please login as admin.",
//       });
//     }
//   }
// };


"use strict";

/*-------------------------------------------------------
    EXPRESSJS - store app - middleware - authentication
------------------------------------------------------- */

const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  // Check for session existence and email presence
  if (!req.session || !req.session.email) {
    return res.status(401).send({
      error: true,
      message: "Unauthorized access! Please login as admin.",
    });
  }

  const { email } = req.session; // Destructure only email for clarity

  try {
    // Fetch user from database securely using findOne() and password comparison
    const user = await User.findOne({ email:"admin@aa.com" });

    if (!user || !(user.password == req.session.password)) {
      return res.status(401).send({
        error: true,
        message: "Unauthorized access! Invalid email or password.",
      });
    }

    // Authentication successful, proceed with the request
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).send({
      error: true,
      message: "Internal Server Error: Authentication failed.",
    });
  }
};