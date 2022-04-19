/* eslint-disable consistent-return */
const express = require('express');
const upload = require('../middleware/multer');

const {
  scrap,
  getAllFood,
  getFoodNameById,
  getFoodDetailById,
  addFood,
  removeFood,
  insertFoodReview,
  removeFoodReview,
  addFoodRating,
} = require('../controllers/foodController');
const {
  verifyAuthentication,
  verifyAdmin,
} = require('../controllers/authController');

// const storage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     callback(null, Date.now() + file.originalname);
//   },
// });

// const imageFilter = (req, file, cb) => {
//   // accept image files only
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//     return cb(new Error('Only image files are accepted!'), false);
//   }
//   cb(null, true);
// };

const foodRouter = express.Router();

// scrap all foods from ucla menu
foodRouter.post('/scrap', scrap);

// food operation
foodRouter.get('/all/:page', getAllFood);
foodRouter.post('/add_food', verifyAuthentication, verifyAdmin, addFood);
foodRouter.get('/name/:_id', getFoodNameById);
foodRouter.get('/:_id', getFoodDetailById);
foodRouter.delete('/:_id', verifyAuthentication, verifyAdmin, removeFood);

// food review and rating
foodRouter.post(
  '/:_id/add_review',
  verifyAuthentication,
  upload.single('image'),
  insertFoodReview
);
foodRouter.delete(
  '/:_id/:reviewIdToRemove',
  verifyAuthentication,
  removeFoodReview
);
foodRouter.post('/:_id/add_rating', verifyAuthentication, addFoodRating);

module.exports = foodRouter;
