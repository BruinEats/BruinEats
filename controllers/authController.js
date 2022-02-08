const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../config/default.json').jwtSecret;

module.exports.verifyAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      return next();
    });
  } else {
    res.sendStatus(401).json({ message: 'Token Invalid/Expired' });
  }
};
