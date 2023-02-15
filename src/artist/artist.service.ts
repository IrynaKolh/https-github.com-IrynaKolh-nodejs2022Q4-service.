import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { artists } from 'DB/db';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { v4 } from 'uuid';
import { ArtistDto, CreateArtistDto, UpdateArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}
  async getAllArtist(): Promise<ArtistDto[]> {
    return artists;
  }

  async getArtistById(id: string): Promise<ArtistDto> {
    const artist = artists.find((artist: ArtistDto) => artist.id === id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  async createArtist(body: CreateArtistDto): Promise<ArtistDto> {
    const newArtist: ArtistDto = {
      id: v4(),
      name: body.name,
      grammy: body.grammy,
    };
    artists.push(newArtist);
    return newArtist;
  }

  async updateArtist(
    id: string,
    body: UpdateArtistDto,
  ): Promise<ArtistDto | null> {
    const updatedArtist = await this.getArtistById(id);

    if (body.name) updatedArtist.name = body.name;
    if (body.grammy !== undefined) updatedArtist.grammy = body.grammy;
    return updatedArtist;
  }

  async deleteArtist(id: string) {
    const index = artists.findIndex((artist: ArtistDto) => artist.id === id);
    if (index === -1) {
      throw new NotFoundException('Artist not found!');
    }
    artists.splice(index, 1);
    await this.trackService.deleteArtistFromTracks(id);
    await this.albumService.removeArtistFromAlbums(id);
    if (await this.favoriteService.checkTrackInFav(id)) {
      await this.favoriteService.deleteArtistFromFav(id);
    }
  }
}
