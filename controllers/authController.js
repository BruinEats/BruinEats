const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../config/default.json').jwtSecret;

module.exports.verifyAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) {
        res.status(403).json({ message: 'Authentication Failed' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Authentication Failed' });
  }
};
