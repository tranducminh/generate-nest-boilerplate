import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './snake-naming.strategy';

@Injectable()
export class DatabaseConfig {
  constructor(private configService: ConfigService) {}

  public get typeOrmConfig(): TypeOrmModuleOptions {
    return {
      keepConnectionAlive: true,
      type: 'mysql',
      host: this.configService.get<string>('MYSQL_HOST'),
      port: this.configService.get<number>('MYSQL_PORT'),
      username: this.configService.get<string>('MYSQL_USERNAME'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DATABASE'),
      logging: this.configService.get<string>('NODE_ENV') === 'development',
      namingStrategy: new SnakeNamingStrategy(),
      multipleStatements: true,
      migrationsTableName: '__migrations',
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
      subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      migrations: ['dist/databases/migrations/**/*{.ts,.js}'],
    };
  }

  public get redisConfig() {
    return {
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
      db: this.configService.get<number>('REDIS_DB'),
    };
  }
}
