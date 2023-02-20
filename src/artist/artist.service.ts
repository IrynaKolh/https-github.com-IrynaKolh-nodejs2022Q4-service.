import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto, CreateArtistDto, UpdateArtistDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAllArtist(): Promise<ArtistDto[]> {
    return await this.prisma.artist.findMany();
  }

  async getArtistById(id: string): Promise<ArtistDto> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  async createArtist(body: CreateArtistDto): Promise<ArtistDto> {
    const newArtist = await this.prisma.artist.create({
      data: body,
    });
    return newArtist;
  }

  async updateArtist(
    id: string,
    body: UpdateArtistDto,
  ): Promise<ArtistDto | null> {
    const foundArtist = await this.prisma.artist.findUnique({ where: { id } });
    if (!foundArtist) throw new NotFoundException('Artist not found');

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: body,
    });

    return updatedArtist;
  }

  async deleteArtist(id: string) {
    const foundArtist = await this.prisma.artist.findUnique({ where: { id } });
    if (!foundArtist) throw new NotFoundException('Artist not found');

    await this.prisma.artist.delete({ where: { id } });

    // await this.trackService.deleteArtistFromTracks(id);
    // await this.albumService.removeArtistFromAlbums(id);
    // if (await this.favoriteService.checkTrackInFav(id)) {
    //   awa artists.splice(index, 1);it this.favoriteService.deleteArtistFromFav(id);
    // }
  }
}
