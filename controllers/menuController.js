/* eslint-disable no-unreachable-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable node/no-unsupported-features/es-syntax */
const MenuModel = require('../models/menu');

module.exposts.getMenu = async (req, res) => {
  try {
    const { diningHall, date } = req.body;

    const menu = await MenuModel.findOne({ date });
    const menuFoods = menu[diningHall];

    return res.status(200).json(menuFoods);
  } catch (err) {
    console.err(err.message);
    return res.status(500).json(err.message);
  }
};
