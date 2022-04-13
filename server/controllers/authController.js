const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

module.exports.verifyAuthentication = async (req, res, next) => {
  const token = req.headers.authentication;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
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
