import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { DiningHallModule } from './dining-hall/dining-hall.module';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    FoodModule,
    DiningHallModule,
    UserModule,
    SearchModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
