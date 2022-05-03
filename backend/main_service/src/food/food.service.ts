import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodIntr } from './food.model';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel('Food') private readonly FoodModel: Model<FoodIntr>,
  ) {}

  async getFoodById(foodId: string) {
    const food = await this.FoodModel.findById(foodId).exec();
    return food;
  }

  async getFoodNameById(foodId: string) {
    const food = await this.FoodModel.findById(foodId).exec();
    return food.name;
  }

  async getFoodPage(pageNum: string) {
    const allFoods = await this.FoodModel.find()
      .limit(20)
      .skip((parseInt(pageNum) - 1) * 20)
      .exec();

    return allFoods;
  }

  async postFoodRating(foodId: string, rating: string) {
    const food = await this.FoodModel.findById(foodId);

    if (food.numRated !== null && food.rating !== null) {
      food.rating =
        (food.rating * food.numRated + parseFloat(rating)) /
        (food.numRated + 1);
      food.numRated += 1;
    } else {
      food.rating = parseFloat(rating);
      food.numRated = 1;
    }

    await food.save();

    return food;
  }
}
