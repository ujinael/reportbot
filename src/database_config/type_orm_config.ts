import { ServiceType } from '@/config/types';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
export const typeOrmConfigFactory = async (
  configService: ConfigService<ServiceType>,
): Promise<TypeOrmModuleOptions> => {
  configService.get('api.authString');
  return {
    type: 'postgres',
    database: configService.get('database.database'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    synchronize: process.env.NODE_ENV === 'development' ? true : false,
    autoLoadEntities: true,
    entities: [path.resolve(__dirname, '..', '**/*.entity{.ts, .js}')],
  };
};
