import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  artistId: string | null;
}
