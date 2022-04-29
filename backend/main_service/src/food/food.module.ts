import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Food', schema: 'FoodSchema' }]),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
