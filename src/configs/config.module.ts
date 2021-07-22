import { AppConfig } from './app/app.config';
import { DatabaseConfig } from './database/database.config';
import { Global, Module } from '@nestjs/common';

const providers = [AppConfig, DatabaseConfig];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class MainConfigModule {}
