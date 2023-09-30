import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
export const typeOrmConfigFactory = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  console.log(path.resolve(__dirname, '..', '**/*.entity{.ts, .js}'));
  return {
    type: 'postgres',
    database: configService.get<string>('database.database'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    synchronize: process.env.NODE_ENV === 'development' ? true : false,
    autoLoadEntities: true,
    entities: [path.resolve(__dirname, '..', '**/*.entity{.ts, .js}')],
  };
};
