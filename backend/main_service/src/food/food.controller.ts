import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FoodService } from './food.service';

@Controller()
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @MessagePattern('get_food_by_id')
  async getFoodById(foodId: string) {
    try {
      const food = await this.foodService.getFoodById(foodId);

      return { status: HttpStatus.OK, message: 'OK', data: food };
    } catch (error) {
      return { status: HttpStatus.BAD_REQUEST, message: 'error', data: error };
    }
  }

  @MessagePattern('get_food_name_by_id')
  async getFoodNameById(foodId: string) {
    try {
      const foodName = await this.foodService.getFoodNameById(foodId);

      return { status: HttpStatus.OK, message: 'OK', data: foodName };
    } catch (error) {
      return { status: HttpStatus.BAD_REQUEST, message: 'error', data: error };
    }
  }

  @MessagePattern('get_food_page')
  async getFoodPage(pageNum: string) {
    try {
      const foodPage = await this.foodService.getFoodPage(pageNum);

      return { status: HttpStatus.OK, message: 'OK', data: foodPage };
    } catch (error) {
      return { status: HttpStatus.BAD_REQUEST, message: 'error', data: error };
    }
  }

  @MessagePattern('post_food_rating')
  async postFoodRating(postDetail: { foodId: string; rating: string }) {
    try {
      const { foodId, rating } = postDetail;
      const updatedFood = await this.foodService.postFoodRating(foodId, rating);

      return { status: HttpStatus.OK, message: 'OK', data: updatedFood };
    } catch (error) {
      return { status: HttpStatus.BAD_REQUEST, message: 'error', data: error };
    }
  }
}
