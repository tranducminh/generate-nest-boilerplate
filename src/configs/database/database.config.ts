import { ConfigService } from '@nestjs/config';

export class DatabaseConfig {
  constructor(private configService: ConfigService) {}

  public getTypeOrmConfig() {
    return {
      keepConnectionAlive: true,
      type: 'mysql',
      host: this.configService.get<string>('MYSQL_HOST'),
      port: this.configService.get<number>('MYSQL_PORT'),
      username: this.configService.get<string>('MYSQL_USERNAME'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DATABASE'),
      logging: this.configService.get<string>('NODE_ENV') === 'development',
      // namingStrategy: new SnakeNamingStrategy(),
      multipleStatements: true,
      migrationsTableName: '__migrations',
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      // autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      migrations: ['dist/databases/migrations/**/*{.ts,.js}'],
    };
  }

  public get getRedisConfig() {
    return {
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
      db: this.configService.get<number>('REDIS_DATABASE'),
      dbQueue: this.configService.get<number>('REDIS_DATABASE_QUEUE'),
      expire: this.configService.get<number>('REDIS_EXPIRATION_TIME'),
    };
  }
}
