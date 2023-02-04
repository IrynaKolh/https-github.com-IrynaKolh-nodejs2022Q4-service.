import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { favorites } from 'src/DB/db';
import { FavoriteDto } from './dto';
import { ArtistService } from './../artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavoriteService {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackServise: TrackService,
  ) {}

  async getAll(): Promise<FavoriteDto[]> {
    return;
  }
  // tracks
  async addTrackToFav(id: string) {
    const track = await this.trackServise.getTrackById(id);
    if (!track) {
      throw new BadRequestException('Track not found!');
    } else {
      favorites.tracks.push(track);
    }
    return 'Track was added to favorites!';
  }

  async deleteTrackFromFav(id: string) {
    const index = favorites.tracks.findIndex((track) => track.id === id);
    if (index < 0) {
      throw new NotFoundException('Track not found!');
    }
    favorites.tracks.splice(index, 1);
    return 'Track deleted from favorites!';
  }

  // albums
  async addAlbumToFav(id: string) {
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new BadRequestException('Album not found!');
    } else {
      favorites.albums.push(album);
    }
    return 'Album was added to favorites!';
  }

  async deleteAlbumFromFav(id: string) {
    const index = favorites.albums.findIndex((album) => album.id === id);
    if (index < 0) {
      throw new NotFoundException('Album not found!');
    }
    favorites.albums.splice(index, 1);
    return 'Album deleted from favorites!';
  }

  // artists
  async addArtistToFav(id: string) {
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new BadRequestException('Artist not found!');
    } else {
      favorites.artists.push(artist);
    }
    return 'Artist was added to favorites!';
  }

  async deleteArtistFromFav(id: string) {
    const index = favorites.artists.findIndex((artist) => artist.id === id);
    if (index < 0) {
      throw new NotFoundException('Artist not found!');
    }
    favorites.artists.splice(index, 1);
    return 'Artist deleted from favorites!';
  }
}
