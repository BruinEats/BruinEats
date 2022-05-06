import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('search')
export class SearchController {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  @Post('food_name')
  async searchFoodName(
    @Body('foodName') foodName: string,
    @Body('diningHallName') diningHallName: string,
  ) {
    const foodDetail = await firstValueFrom(
      this.mainServiceClient.send('search_food_name', {
        foodName,
        diningHallName,
      }),
    );

    return {
      message: foodDetail.message,
      food: foodDetail.data,
    };
  }

  @Post('dining_hall')
  async searchDiningHall(@Body('diningHallName') diningHallName: string) {
    const diningHallDetail = await firstValueFrom(
      this.mainServiceClient.send('search_dininghall', diningHallName),
    );

    return {
      message: diningHallDetail.message,
      diningHall: diningHallDetail.data,
    };
  }
}
