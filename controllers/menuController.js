/* eslint-disable no-unreachable-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable node/no-unsupported-features/es-syntax */
const puppeteer = require('puppeteer');
const MenuModel = require('../models/menu');
const FoodModel = require('../models/food');

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

module.exports.getMenu = async (req, res) => {
  try {
    const { diningHall, date } = req.body;

    const menu = await MenuModel.findOne({ date });
    const menuFoods = menu[diningHall];

    return res.status(200).json(menuFoods);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(err.message);
  }
};

module.exports.scrapMenuToday = async (req, res) => {
  try {
    const menuToday = new MenuModel({
      date: new Date().toISOString().slice(0, 10),
    });

    for await (const diningHall of diningHalls) {
      const foodNames = await getMenu(diningHall.link);

      const foods = [];
      const existedNames = [];
      for await (const name of foodNames) {
        const food = await FoodModel.findOne({ name });

        // create new food if not existed
        if (!food && !(name in existedNames)) {
          const newFood = await new FoodModel({
            name,
            diningHall: diningHall.name,
          }).save();
          foods.push(newFood);
          existedNames.push(name);
        } else {
          foods.push(food);
          existedNames.push(name);
        }
      }

      menuToday[diningHall.link] = foods;
      console.log(diningHall.name + foods.length);
      console.log(menuToday[diningHall.link].length);
    }
    await menuToday.save();
    return res.status(200).json(menuToday);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(err.message);
  }
};
