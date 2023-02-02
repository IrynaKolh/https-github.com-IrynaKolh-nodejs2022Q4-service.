import { IsString } from "class-validator";

export class ArtistDto {
  @IsString()
  readonly id: string;
  @IsString() 
  name: string;
  @IsString()
  grammy: boolean;
}