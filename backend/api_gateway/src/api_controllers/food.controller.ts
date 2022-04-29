import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('food')
export class FoodController {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  @Get(':id')
  async getFoodById(@Param('id') foodId: string) {
    const foodResponse = await firstValueFrom(
      this.mainServiceClient.send('get_food_by_id', foodId),
    );

    return {
      message: foodResponse.message,
      data: {
        food: foodResponse.data,
      },
      errors: null,
    };
  }
}
