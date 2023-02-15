import { IsString, IsInt, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
