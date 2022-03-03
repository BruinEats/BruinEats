/* eslint no-underscore-dangle: 0 */

const FoodModel = require('../models/food');
const DiningHallModel = require('../models/diningHall');

module.exports.searchFoodName = async (req, res) => {
  try {
    const { foodName, diningHallName } = req.body;
    console.log(foodName, diningHallName);

    const regexp = new RegExp(`.*${foodName || ''}.*`, 'i');
    const filteredFood = await FoodModel.find({ name: regexp });

    if (!diningHallName || diningHallName === 'ALL') {
      res.status(200).json({
        food: filteredFood.map((food) => ({
          name: food.name,
          id: food._id,
          rating: food.rating,
        })),
      });
    } else {
      res.status(200).json({
        food: filteredFood
          .filter((food) => food.diningHall === diningHallName)
          .map((food) => ({
            name: food.name,
            id: food._id,
            rating: food.rating,
          })),
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.searchDiningHall = async (req, res) => {
  try {
    const { diningHallName } = req.body;

    const regexp = new RegExp(`.*${diningHallName || ''}.*`, 'i');
    const filteredDiningHalls = await DiningHallModel.find({ name: regexp });

    res.status(200).json({
      diningHalls: filteredDiningHalls.map((diningHall) => ({
        name: diningHall.name,
        _id: diningHall._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
