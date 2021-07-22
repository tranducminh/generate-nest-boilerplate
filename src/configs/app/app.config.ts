import { ConfigService } from '@nestjs/config';

export class AppConfig {
  constructor(private configService: ConfigService) {}

  public get(key: string): string {
    return this.configService.get<string>(key);
  }

  public getNumber(key: string): number {
    return this.configService.get<number>(key);
  }

  public env(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }
}
