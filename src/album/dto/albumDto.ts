import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class AlbumDto {
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  artistId: string | null;
}
