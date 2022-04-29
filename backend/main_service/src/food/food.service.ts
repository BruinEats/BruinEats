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
}
