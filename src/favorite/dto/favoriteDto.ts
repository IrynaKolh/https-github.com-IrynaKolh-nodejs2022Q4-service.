import { AlbumDto } from 'src/album/dto';
import { ArtistDto } from 'src/artist/dto';
import { TrackDto } from 'src/track/dto';

export class FavoriteDto {
  artists: ArtistDto[];
  albums: AlbumDto[];
  tracks: TrackDto[];
}
