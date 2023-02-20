import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto, AlbumDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAllAlbums(): Promise<AlbumDto[]> {
    return await this.prisma.album.findMany();
  }

  async getAlbumById(id: string): Promise<AlbumDto> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async createAlbum(album: CreateAlbumDto): Promise<AlbumDto> {
    const newAlbum = await this.prisma.album.create({
      data: album,
    });
    return newAlbum;
  }

  async updateAlbum(
    id: string,
    body: UpdateAlbumDto,
  ): Promise<AlbumDto | null> {
    const foundAlbum = await this.prisma.album.findUnique({ where: { id } });
    if (!foundAlbum) throw new NotFoundException('Album not found');

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: body,
    });

    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    const foundAlbum = await this.prisma.album.findUnique({ where: { id } });
    if (!foundAlbum) throw new NotFoundException('Album not found');

    await this.prisma.album.delete({ where: { id } });

    // await this.trackService.deleteAlbumFromTracks(id);
    // if (await this.favoriteService.checkAlbunInFav(id)) {
    //   await this.favoriteService.deleteAlbumFromFav(id);
    // }
  }

  // async ifArtistExist(id: string | null) {
  //   if (id === null) {
  //     return;
  //   } else {
  //     const artist = artists.find((artist: ArtistDto) => artist.id === id);
  //     if (!artist) {
  //       throw new BadRequestException('Artist not found!');
  //     }
  //     return artist;
  //   }
  // }

  // async removeArtistFromAlbums(id: string | null) {
  //   albums.forEach((album, index) => {
  //     if (album.artistId == id) {
  //       album.artistId = null;
  //       albums[index] = album;
  //     }
  //   });
  // }
}
