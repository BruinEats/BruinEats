/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

module.exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res
        .status(400)
        .json({ message: 'A User with the given email already exists' });
      return;
    }

    const uclaEmailRegex = /^[A-Za-z0-9._%+-]+@(g.)?ucla.edu/g;
    if (!email.match(uclaEmailRegex)) {
      res.status(400).json({ message: 'You must register with an ucla email' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      name,
    });
    const token = jwt.sign({ email, id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const signinUser = await UserModel.findOne({ email });

    if (!signinUser) {
      res.status(404).json({ message: 'User Not Found' });
      return;
    }

    const isPasswordSame = await bcrypt.compare(password, signinUser.password);
    if (!isPasswordSame) {
      res.status(400).json({ message: 'Password Not Correct ' });
      return;
    }

    const token = jwt.sign(
      { email, id: signinUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

module.exports.updateUsrInfo = async (req, res) => {
  const { _id } = req.params;
  const { newEmail, newPassword, newName } = req.body;

  if (req.user._id !== _id) {
    res.status(401).json({
      message:
        'Unauthorized: Your authentication token does not match with the user',
    });
    return;
  }

  try {
    const updateUser = await UserModel.findOne({ _id });

    if (newEmail) {
      updateUser.email = newEmail;
    }

    if (newPassword) {
      updateUser.password = newPassword;
    }

    if (newName) {
      updateUser.name = newName;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(_id, updateUser, {
      new: true,
    });
    await updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getUsrDetail = async (req, res) => {
  const { email } = req.body;

  try {
    const signinUser = await UserModel.findOne({ email });

    if (!signinUser) {
      res.status(404).json({ message: 'User Not Found' });
      return;
    }

    res.status(200).json(signinUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getUsrByToken = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    console.log(req.user);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};
