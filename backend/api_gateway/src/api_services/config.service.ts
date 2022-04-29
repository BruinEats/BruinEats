import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.mainService = {
      options: {
        port: process.env.MAIN_SERVICE_PORT,
        host: process.env.MAIN_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.mlService = {
      options: {
        port: process.env.ML_SERVICE_PORT,
        host: process.env.ML_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
