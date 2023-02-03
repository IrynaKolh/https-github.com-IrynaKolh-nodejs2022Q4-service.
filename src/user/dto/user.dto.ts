import { Exclude } from "class-transformer";
import { IsString, IsInt } from "class-validator";

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
  readonly createdAt: number; 
  
  @IsInt()
  updatedAt: number; 
}
