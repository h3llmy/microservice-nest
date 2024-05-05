import { IsNumber, IsOptional, IsString } from 'class-validator';

export class getPagination {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  search?: string;
}
