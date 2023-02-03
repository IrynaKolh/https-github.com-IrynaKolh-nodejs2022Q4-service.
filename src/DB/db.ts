import { AlbumDto } from "src/album/dto";
import { ArtistDto } from "src/artist/dto/artistDto";
import { FavoriteDto } from "src/favorite/dto";
import { TrackDto } from "src/track/dto/trackDto";
import { UserDto } from "src/user/dto/user.dto";

export const users: UserDto[] = [];
export const artists: ArtistDto[] = [];
export const tracks: TrackDto[] = [];
export const albums: AlbumDto[] = [];

export const favorites: FavoriteDto = {
  artists: [],
  albums: [],
  tracks: [],
};