import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

// api routes
import { FoodController } from './api_controllers/food.controller';

// gateway config
import { ConfigService } from './api_services/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [FoodController],
  providers: [
    ConfigService,
    {
      provide: 'MAIN_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mainServiceOptions = configService.get('mainService');
        return ClientProxyFactory.create(mainServiceOptions);
      },
      inject: [ConfigService],
    },
    // {
    //   provide: 'ML_SERVICE',
    //   useFactory: (configService: ConfigService) => {
    //     const mlServiceOptions = configService.get('mlService');
    //     return ClientProxyFactory.create(mlServiceOptions);
    //   },
    //   inject: [ConfigService],
    // },
  ],
})
export class AppModule {}
