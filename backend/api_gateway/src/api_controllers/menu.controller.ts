import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('menu')
export class MenuController {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  @Post('getMenu')
  async getMenu(
    @Body('diningHall') diningHall: string,
    @Body('date') date: string,
  ) {
    const menuDetail = await firstValueFrom(
      this.mainServiceClient.send('get_menu', { diningHall, date }),
    );

    return {
      message: menuDetail.message,
      menu: menuDetail.data,
    };
  }

  @Post('scrapeMenuToday')
  async scrapeMenuToday() {
    const todayMenu = await firstValueFrom(
      this.mainServiceClient.send('scrape_menu_today', {}),
    );

    return {
      message: todayMenu.message,
      menu: todayMenu.data,
    };
  }
}
