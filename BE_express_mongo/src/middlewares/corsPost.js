"use strict"
"use strict";

module.exports = (req, res, next) => {
    if (req.method !== 'POST') {
        return res.status(405).send('İzin Verilmeyen Yöntem');
      }

      // CORS başlıklarını ayarlayın (izin verdiğiniz kaynak ve başlıkları ile değiştirin)
      res.set({
        'Access-Control-Allow-Origin': '*', // İzin verilen kaynak ile değiştirin
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Authorization ', // İhtiyacınıza göre izin verilen başlıkları ayarlayın
      });

      next();
}