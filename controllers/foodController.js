/* eslint-disable no-unreachable-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint no-underscore-dangle: 0 */
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const FoodModel = require('../models/food');
const DiningHallModel = require('../models/diningHall');

const diningHalls = [
  {
    name: 'Study at Hedrick',
    link: 'HedrickStudy',
  },
  {
    name: 'Rendezvous',
    link: 'Rendezvous',
  },
  {
    name: 'Feast at Rieber',
    link: 'FeastAtRieber',
  },
  {
    name: 'The Drey',
    link: 'Drey',
  },
  {
    name: 'Bruin Cafe',
    link: 'BruinCafe',
  },
  {
    name: 'De Neve',
    link: 'DeNeve',
  },
  {
    name: 'Bruin Plate',
    link: 'BruinPlate',
  },
  {
    name: 'Epicuria',
    link: 'Epicuria',
  },
];

const getMenu = async (dinningHall) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`http://menu.dining.ucla.edu/Menus/${dinningHall}`);

  const foodNames = await page.$$eval('a.recipelink', (el) =>
    el.map((item) => item.textContent)
  );

  await page.close();
  await browser.close();
  return foodNames;
};

module.exports.scrap = async (req, res) => {
  try {
    const { hallName, hallLink } = req.body;
    // for await (const hall of diningHalls) {
    const foodNames = await getMenu(hallLink);
    const diningHall = await DiningHallModel.findOne({
      name: hallName,
    });

    const foods = [];
    const existedNames = [];
    for await (const name of foodNames) {
      const existedFood = await FoodModel.findOne({ name });
      if (!existedFood && !(name in existedNames)) {
        const food = new FoodModel({ name, diningHall: diningHall.name });
        foods.push(food);
        existedNames.push(name);
      }
    }
    await FoodModel.insertMany(foods);

    diningHall.foods = diningHall.foods.concat(foods);
    await diningHall.save();
    // }
    return res.status(200).json(foods.length);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

module.exports.getAllFood = async (req, res) => {
  try {
    const { page } = req.params;

    const allFoods = await FoodModel.find()
      .limit(20)
      .skip((page - 1) * 20)
      .exec();

    res.status(200).json({
      allFoods: allFoods.map((food) => ({
        name: food.name,
        rating: food.rating,
        diningHall: food.diningHall,
        _id: food._id,
      })),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.getFoodDetailById = async (req, res) => {
  const { _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({
        error: 'No food with the given id',
      });
    }

    const food = await FoodModel.findOne({ _id });

    res.status(200).json({ food });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.addFood = async (req, res) => {
  try {
    const { name, diningHall } = req.body;
    const newFood = new FoodModel({ name, diningHall });

    await newFood.save();
    res.status(200).json({ food: newFood });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.removeFood = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({
        error: 'No food with the given id',
      });
    }

    await FoodModel.findByIdAndDelete(_id);
    res.status(200).json({ message: 'Food successfully deleted' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.insertFoodReview = async (req, res) => {
  try {
    const { newReviewId } = req.body;
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({
        error: 'No food with the given id',
      });
    }

    const food = await FoodModel.findOne({ _id });

    // TODO: insert review id

    await food.save();

    res.status(200).json({ food });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.removeFoodReview = async (req, res) => {
  try {
    const { _id, reviewIdToRemove } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({
        error: 'No food with the given id',
      });
    }

    const food = await FoodModel.findOne({ _id });

    // TODO: Remove review id

    await food.save();

    res.status(200).json({ food });
  } catch (error) {
    res.status(500).json({ error });
  }
};
