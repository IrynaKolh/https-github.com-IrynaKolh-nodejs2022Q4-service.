import { IsString, IsInt, IsOptional, IsNotEmpty } from "class-validator";

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  artistId: string | null; 

  @IsOptional()
  albumId: string | null;
   
  @IsInt()
  @IsNotEmpty()
  duration: number; 
}