import { IsString, IsInt, IsNotEmpty } from "class-validator";

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsInt()
  year: number;

  artistId: string | null; 
}