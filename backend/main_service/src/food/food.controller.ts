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
      return { status: HttpStatus.BAD_REQUEST, message: 'error', data: null };
    }
  }
}
