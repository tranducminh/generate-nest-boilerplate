import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class BasePaginationDto {
  @IsNumber()
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(20)
  @IsOptional()
  readonly limit: number = 15;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
