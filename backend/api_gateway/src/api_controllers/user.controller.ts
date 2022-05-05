import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    @Inject('MAIN_SERVICE') private readonly mainServiceClient: ClientProxy,
  ) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string,
  ) {
    const registerResponse = await firstValueFrom(
      this.mainServiceClient.send('register', { email, name, password }),
    );

    return {
      message: registerResponse.message,
      data: registerResponse.data,
    };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const loginResponse = await firstValueFrom(
      this.mainServiceClient.send('login', { email, password }),
    );

    return {
      message: loginResponse.message,
      data: loginResponse.data,
    };
  }
}
