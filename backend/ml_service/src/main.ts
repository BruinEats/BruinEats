import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  Transport,
  TcpOptions,
} from '@nestjs/microservices';
import { ConfigService } from './config/config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService = new ConfigService();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: configService.get('host'),
        port: configService.get('port'),
      },
    } as TcpOptions,
  );

  await app.listen();
}
bootstrap();
