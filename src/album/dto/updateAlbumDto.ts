import { IsString, IsInt, IsNotEmpty } from "class-validator";

export class UpdateAlbumDto {
  @IsString()
  name: string;
  
  @IsInt()
  year: number;

  artistId: string | null; 
}