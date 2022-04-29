import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
