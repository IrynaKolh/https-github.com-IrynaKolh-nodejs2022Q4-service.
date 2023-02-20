import { Exclude } from 'class-transformer';
import { IsString, IsInt } from 'class-validator';

export class UserDto {
  @IsString()
  readonly id: string;

  @IsString()
  login: string;

  @IsString()
  @Exclude()
  password: string;

  @IsInt()
  version: number;

  @IsInt()
  readonly createdAt: Date;

  @IsInt()
  updatedAt: Date;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

// https://docs.nestjs.com/techniques/serialization#exclude-properties
