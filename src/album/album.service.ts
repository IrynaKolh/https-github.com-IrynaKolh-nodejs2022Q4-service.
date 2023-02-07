import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { ArtistDto } from 'src/artist/dto';
import { albums, artists } from 'src/DB/db';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { v4 } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto, AlbumDto } from './dto';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {}

  async getAllAlbums(): Promise<AlbumDto[]> {
    return albums;
  }

  async getAlbumById(id: string): Promise<AlbumDto> {
    const album = albums.find((album: AlbumDto) => album.id === id);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async createAlbum(album: CreateAlbumDto): Promise<AlbumDto> {
    const newAlbum: AlbumDto = {
      id: v4(),
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };

    albums.push(newAlbum);
    return newAlbum;
  }

  async updateAlbum(
    id: string,
    body: UpdateAlbumDto,
  ): Promise<AlbumDto | null> {
    const updatedAlbum = await this.getAlbumById(id);
    if (updatedAlbum) {
      updatedAlbum.name = body.name;
      updatedAlbum.year = body.year;
      updatedAlbum.artistId = body.artistId;
      return updatedAlbum;
    }
  }

  async deleteAlbum(id: string) {
    const index = albums.findIndex((album: AlbumDto) => album.id === id);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    albums.splice(index, 1);
    await this.trackService.deleteAlbumFromTracks(id);
    if (await this.favoriteService.checkAlbunInFav(id)) {
      await this.favoriteService.deleteAlbumFromFav(id);
    }
  }

  async ifArtistExist(id: string | null) {
    if (id === null) {
      return;
    } else {
      const artist = artists.find((artist: ArtistDto) => artist.id === id);
      if (!artist) {
        throw new BadRequestException('Artist not found!');
      }
      return artist;
    }
  }

  async removeArtistFromAlbums(id: string | null) {
    albums.forEach((album, index) => {
      if (album.artistId == id) {
        album.artistId = null;
        albums[index] = album;
      }
    });
  }
}
