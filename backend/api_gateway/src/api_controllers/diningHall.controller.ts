import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('dininghall')
export class DiningHallController {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  @Get('all')
  async getAllDiningHalls() {
    const diningHalls = await firstValueFrom(
      this.mainServiceClient.send('get_all_dininghalls', {}),
    );

    return {
      message: diningHalls.message,
      diningHalls: diningHalls.data,
    };
  }

  @Get(':id')
  async getDiningHallById(@Param('id') diningHallId: string) {
    const diningHallDetail = await firstValueFrom(
      this.mainServiceClient.send('get_dininghall_by_id', diningHallId),
    );

    return {
      message: diningHallDetail.message,
      diningHall: diningHallDetail.data,
    };
  }
}
