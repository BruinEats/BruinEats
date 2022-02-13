const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../config/default.json').jwtSecret;
const UserModel = require('../models/user');

module.exports.verifyAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) {
        res.status(403).json({ message: 'Authentication Failed' });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Authentication Failed' });
  }
};

module.exports.verifyAdmin = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await UserModel.findOne({ _id: id });

    if (user.admin) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
