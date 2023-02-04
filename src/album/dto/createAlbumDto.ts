import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  id: string;
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsOptional()
  artistId: string | null;
}
