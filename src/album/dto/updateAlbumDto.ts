import { IsString, IsInt, IsNotEmpty, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
