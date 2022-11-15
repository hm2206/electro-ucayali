import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { createConnection } from 'typeorm';

export const TYPEORM_CONNECTION = 'TYPEORM_CONNECTION';

export const typeormProvider = {
  provide: TYPEORM_CONNECTION,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const logger = new Logger(TYPEORM_CONNECTION);
    // config basic
    const configEnv: any = {
      host: config.get('PG_HOST'),
      port: parseInt(config.get('PG_PORT', '0')),
      username: config.get('PG_USER', ''),
      password: config.get('PG_PASSWORD', ''),
      database: config.get('PG_DATABASE', ''),
      synchronize: JSON.parse(config.get('PG_SYNC', 'false')),
      logging: true,
    };
    // info config
    Object.keys(configEnv).forEach((attr) => {
      logger.verbose(`${attr} => ${configEnv[attr]}`);
    });
    // config
    return await createConnection({
      type: 'postgres',
      ...configEnv,
      entities: [resolve(__dirname, '../orm/*.{js,ts}')],
    });
  },
};
