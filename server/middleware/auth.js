const admin = require('../config/admin')
const db = admin.firestore()

const verifyFirebaseToken = (req, res, next) => {
    const idToken = req.headers['x-firebase-token'];
    if (!idToken) {
      return res.status(401).send({ error: 'Unauthorized: No Firebase ID token provided' });
    }
  
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((error) => {
        return res.status(401).send({ error: 'Unauthorized: Invalid Firebase ID token' });
      });
  };

  module.exports = verifyFirebaseToken;