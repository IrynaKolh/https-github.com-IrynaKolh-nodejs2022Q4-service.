import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class ArtistDto {
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString() 
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}