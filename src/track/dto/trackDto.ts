import { IsString, IsInt } from 'class-validator';

export class TrackDto {
  @IsString()
  readonly id: string;
  @IsString()
  name: string;
  artistId: string | null;
  albumId: string | null;
  @IsInt()
  duration: number;
}
