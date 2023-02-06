import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albums, artists, favorites, tracks } from 'src/DB/db';
import { ArtistService } from './../artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavoriteService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackServise: TrackService,
  ) {}

  async getAll() {
    const allFavsTracks = await Promise.all(
      favorites.tracks.map(
        async (i) => await this.trackServise.getTrackById(i),
      ),
    );
    const allFavsAlbums = await Promise.all(
      favorites.albums.map(
        async (i) => await this.albumService.getAlbumById(i),
      ),
    );
    const allFavsArtists = await Promise.all(
      favorites.artists.map(
        async (i) => await this.artistService.getArtistById(i),
      ),
    );
    return {
      albums: allFavsAlbums,
      artists: allFavsArtists,
      tracks: allFavsTracks,
    };
  }

  // check favotites
  async checkTrackInFav(idTrack: string) {
    const isFav = favorites.tracks.find((id) => id === idTrack);
    return isFav;
  }

  async checkArtistInFav(idArtist: string) {
    const isFav = favorites.artists.find((id) => id === idArtist);
    return isFav;
  }

  async checkAlbunInFav(idAlbum: string) {
    const isFav = favorites.artists.find((id) => id === idAlbum);
    return isFav;
  }

  // tracks
  async addTrackToFav(id: string) {
    if (tracks.findIndex((i) => i.id === id) === -1) {
      throw new UnprocessableEntityException();
    }
    const track = await this.trackServise.getTrackById(id);
    return favorites.tracks.push(track.id);
  }

  async deleteTrackFromFav(id: string) {
    const index = favorites.tracks.findIndex((i) => i === id);
    if (index === -1) {
      throw new NotFoundException('Track not found! 1');
    }
    await favorites.tracks.splice(index, 1);
  }

  // albums
  async addAlbumToFav(id: string) {
    if (albums.findIndex((i) => i.id === id) === -1) {
      throw new UnprocessableEntityException();
    }
    const album = await this.albumService.getAlbumById(id);
    return await favorites.albums.push(album.id);
  }

  async deleteAlbumFromFav(id: string) {
    const index = favorites.albums.findIndex((i) => i === id);
    if (index === -1) {
      throw new NotFoundException('Album not found!');
    }
    await favorites.albums.splice(index, 1);
  }

  // artists
  async addArtistToFav(id: string) {
    if (artists.findIndex((i) => i.id === id) === -1) {
      throw new UnprocessableEntityException();
    }
    const artist = await this.artistService.getArtistById(id);
    return await favorites.artists.push(artist.id);
  }

  async deleteArtistFromFav(id: string) {
    const index = favorites.artists.findIndex((i) => i === id);
    if (index === -1) {
      throw new NotFoundException('Artist not found!');
    }
    await favorites.artists.splice(index, 1);
  }
}
