import { IsString, IsInt, IsNotEmpty, ValidateIf, Min } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  duration: number;
}
