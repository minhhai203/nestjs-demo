/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  address: string;

  @IsNumber()
  age: number;

  @IsOptional()
  isActive: boolean;
}

export class GetUserQuery {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  minAge: number;
  take: number;
  skip: number;

  @IsOptional()
  @IsString()
  name: string;
}
