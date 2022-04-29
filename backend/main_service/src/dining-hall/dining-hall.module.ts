import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiningHallController } from './dining-hall.controller';
import { DiningHallSchema } from './dining-hall.model';
import { DiningHallService } from './dining-hall.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DiningHall', schema: DiningHallSchema },
    ]),
  ],
  controllers: [DiningHallController],
  providers: [DiningHallService],
})
export class DiningHallModule {}
