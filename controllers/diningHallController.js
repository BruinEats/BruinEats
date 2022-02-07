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
