import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumDto } from 'src/album/dto';
import { ArtistDto } from 'src/artist/dto';
import { tracks, artists, albums } from 'DB/db';
import { FavoriteService } from 'src/favorite/favorite.service';
import { v4 } from 'uuid';
import { CreateTrackDto, UpdateTrackDto, TrackDto } from './dto';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {}

  async getAllTracks(): Promise<TrackDto[]> {
    return tracks;
  }

  async getTrackById(id: string): Promise<TrackDto> {
    const track = tracks.find((track: TrackDto) => track.id === id);
    if (!track) throw new NotFoundException('Track not found 3');
    return track;
  }

  async createTrack(track: CreateTrackDto): Promise<TrackDto> {
    const newTrack: TrackDto = {
      id: v4(),
      ...track,
    };
    tracks.push(newTrack);
    return newTrack;
  }

  async updateTrack(
    id: string,
    body: UpdateTrackDto,
  ): Promise<TrackDto | null> {
    const updatedTrack = await this.getTrackById(id);

    if (body.name) updatedTrack.name = body.name;
    if (body.artistId) updatedTrack.artistId = body.artistId;
    if (body.albumId) updatedTrack.albumId = body.albumId;
    if (body.duration) updatedTrack.duration = body.duration;

    return updatedTrack;
  }

  async deleteTrack(id: string) {
    const index = tracks.findIndex((track: TrackDto) => track.id === id);
    if (index === -1) {
      throw new NotFoundException('Track not found 2');
    }
    tracks.splice(index, 1);
    if (await this.favoriteService.checkTrackInFav(id)) {
      await this.favoriteService.deleteTrackFromFav(id);
    }
  }

  async deleteArtistFromTracks(id: string) {
    tracks.forEach((track, index) => {
      if (track.artistId == id) {
        track.artistId = null;
        tracks[index] = track;
      }
    });
  }

  async deleteAlbumFromTracks(id: string) {
    tracks.forEach((track, index) => {
      if (track.albumId == id) {
        track.albumId = null;
        tracks[index] = track;
      }
    });
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

  async ifAlbumExist(id: string | null) {
    if (id === null) {
      return;
    } else {
      const album = albums.find((album: AlbumDto) => album.id === id);
      if (!album) {
        throw new BadRequestException('Album not found!');
      }
      return album;
    }
  }
}
