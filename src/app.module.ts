import { MainConfigModule } from '@configs/config.module';
import { DatabaseConfig } from '@configs/database/database.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    // by default limit 100 requests in 60s
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        '.env.development',
        '.env.staging',
        '.env.production',
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [MainConfigModule],
      useFactory: (databaseConfig: DatabaseConfig) =>
        databaseConfig.typeOrmConfig,
      inject: [DatabaseConfig],
    }),
    RedisModule.forRootAsync({
      imports: [MainConfigModule],
      useFactory: (databaseConfig: DatabaseConfig) =>
        databaseConfig.redisConfig,
      inject: [DatabaseConfig],
    }),

    UsersModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
