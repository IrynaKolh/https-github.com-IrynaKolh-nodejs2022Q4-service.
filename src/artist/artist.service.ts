import { Injectable, NotFoundException } from '@nestjs/common';
import { artists } from 'src/DB/db';
import { v4 } from 'uuid';
import { ArtistDto, CreateArtistDto, UpdateArtistDto } from './dto';

@Injectable()
export class ArtistService {
  async getAllArtist(): Promise<ArtistDto[]> {
    return artists;
  }

  async getArtistById(id: string): Promise<ArtistDto> {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found!');
    }
    return artist;
  }

  async createArtist(body: CreateArtistDto): Promise<ArtistDto> {
    const newArtist = {
      id: v4(),
      ...body,
    };
    artists.push(newArtist);
    return newArtist;
  }

  async updateArtist(id: string, body: UpdateArtistDto): Promise<ArtistDto> {
    const updatedArtist: ArtistDto = await this.getArtistById(id);
    updatedArtist.name = body.name;
    updatedArtist.grammy = body.grammy;

    return updatedArtist;
  }

  async deleteArtist(id: string) {
    const index = artists.findIndex((user) => user.id === id);
    if (index < 0) {
      throw new NotFoundException('Artist not found!');
    }
    artists.splice(index, 1);
    return 'Artist deleted!';
  }
}
