import { IsString, IsInt, ValidateIf, IsNotEmpty, Min } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  duration: number;
}
