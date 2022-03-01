/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable node/no-unsupported-features/es-syntax */

const DiningHallModel = require('../models/diningHall');

module.exports.add = async (req, res) => {
  const { name } = req.body;
  try {
    const existedDiningHall = await DiningHallModel.findOne({ name });

    if (existedDiningHall) {
      return res
        .status(400)
        .json({ message: 'A DinningHall with the given name already exists' });
    }

    const diningHall = new DiningHallModel({ name });
    diningHall.save();
    return res.status(200).json(diningHall);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports.getAllDiningHall = async (req, res) => {
  try {
    const allDiningHalls = await DiningHallModel.find();

    res.status(200).json({
      allDiningHalls: allDiningHalls.map((diningHall) => ({
        id: diningHall._id,
        name: diningHall.name,
      })),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.getAllDiningHallDetails = async (req, res) => {
  try {
    const { _id } = req.params;
    const diningHallDetails = await DiningHallModel.findOne({ _id });

    res.status(200).json({
      diningHallDetails,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
