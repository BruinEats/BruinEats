import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('food')
export class FoodController {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  @Get(':id')
  async getFoodById(@Param('id') foodId: string) {
    const foodDetail = await firstValueFrom(
      this.mainServiceClient.send('get_food_by_id', foodId),
    );

    return {
      message: foodDetail.message,
      food: foodDetail.data,
    };
  }

  @Get('all/:page')
  async getFoodPaginated(@Param('page') pageNum: string) {
    const foodPage = await firstValueFrom(
      this.mainServiceClient.send('get_food_page', pageNum),
    );

    return {
      message: foodPage.message,
      foodPage: foodPage.data,
    };
  }

  @Get('name/:id')
  async getFoodNameById(@Param('id') foodId: string) {
    const foodName = await firstValueFrom(
      this.mainServiceClient.send('get_food_name_by_id', foodId),
    );

    return {
      message: foodName.message,
      foodName: foodName.data,
    };
  }

  // TODO: add authentication check
  //
  // @Post(':id/add_rating')
  // async postFoodRating(
  //   @Param('id') foodId: string,
  //   @Body('rating') rating: string,
  // ) {
  //   const ratingResponse = await firstValueFrom(
  //     this.mainServiceClient.send('post_food_rating', { foodId, rating }),
  //   );

  //   return {
  //     message: ratingResponse.message,
  //     food: ratingResponse.data,
  //   };
  // }
}
