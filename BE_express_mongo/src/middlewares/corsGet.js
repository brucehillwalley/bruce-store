"use strict";

// module.exports = (req, res, next) => {
//     if (req.method !== 'GET') {
//         return res.status(405).send('İzin Verilmeyen Yöntem');
//       }

//       // CORS başlıklarını ayarlayın (izin verdiğiniz kaynak ve başlıkları ile değiştirin)
//       res.set({
//         'Access-Control-Allow-Origin': '*', // İzin verilen kaynak ile değiştirin
//         'Access-Control-Allow-Methods': 'GET',
//         'Access-Control-Allow-Headers': 'Content-Type', // İhtiyacınıza göre izin verilen başlıkları ayarlayın
//       });

//       next();
// }
const express = require('express')
const cors = require('cors')
const app = express()
module.exports = (req, res, next) => {
  if (req.method == 'GET') {
        app.use(cors({methods: 'GET'}))
        next() 
  }else{
        return res.status(405).send('İzin Verilmeyen Yöntem');
  }
   
}


