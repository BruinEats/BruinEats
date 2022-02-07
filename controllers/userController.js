const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecretKey = require("../config/default.json").jwtSecret;
const UserModel = require("../models/user");

module.exports.register = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res
        .status(400)
        .json({ message: "A User with the given email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      name,
    });
    const token = jwt.sign({ email, id: newUser._id }, jwtSecretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const signinUser = await UserModel.findOne({ email });

    if (!signinUser) {
      res.status(404).json({ message: "User Not Found" });
    }

    const isPasswordSame = await bcrypt.compare(password, signinUser.password);
    if (!isPasswordSame) {
      res.status(400).json({ message: "Password Not Correct " });
    }

    const token = jwt.sign({ email, id: signinUser._id }, jwtSecretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: token });
  } catch (error) {
    re.status(500).json(error);
  }
};
