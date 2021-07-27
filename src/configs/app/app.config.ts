import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  constructor(private configService: ConfigService) {}

  public get(key: string): string {
    const value = this.configService.get<string>(key);

    if (!value) throw new Error(`${[key]} is not found in env file`);

    return value;
  }

  public getNumber(key: string): number {
    const value = this.configService.get<number>(key);

    if (!value) throw new Error(`${[key]} is not found in env file`);

    return value;
  }

  get env(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }
}
