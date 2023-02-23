import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/createFavoriteDto';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<CreateFavoriteDto> {
    const favorites = await this.prisma.favorites.findMany({
      select: {
        artists: {
          select: { id: true, name: true, grammy: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
      },
    });
    if (!favorites.length) return { albums: [], artists: [], tracks: [] };
    return favorites[0];
  }

  // tracks
  async addTrackToFav(trackId: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) throw new UnprocessableEntityException('Track not found');

    const favorites = await this.prisma.favorites.findMany();

    if (!favorites.length) {
      const createFavs = await this.prisma.favorites.create({ data: {} });

      await this.prisma.track.update({
        where: { id: trackId },
        data: { favoritesId: createFavs.id },
      });
    } else {
      await this.prisma.track.update({
        where: { id: trackId },
        data: { favoritesId: favorites[0].id },
      });
    }
    return track;
  }

  async deleteTrackFromFav(trackId: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) throw new UnprocessableEntityException('Track not found');

    await this.prisma.track.update({
      where: { id: trackId },
      data: { favoritesId: null },
    });
  }

  // albums
  async addAlbumToFav(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) throw new UnprocessableEntityException('Album not found');

    const favorites = await this.prisma.favorites.findMany();

    if (!favorites.length) {
      const createFavs = await this.prisma.favorites.create({ data: {} });

      await this.prisma.album.update({
        where: { id: albumId },
        data: { favoritesId: createFavs.id },
      });
    } else {
      await this.prisma.album.update({
        where: { id: albumId },
        data: { favoritesId: favorites[0].id },
      });
    }
    return album;
  }

  async deleteAlbumFromFav(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) throw new UnprocessableEntityException('Album not found');

    await this.prisma.album.update({
      where: { id: albumId },
      data: { favoritesId: null },
    });
  }

  // artists
  async addArtistToFav(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist) throw new UnprocessableEntityException('Artist not found');

    const favorites = await this.prisma.favorites.findMany();

    if (!favorites.length) {
      const createFavs = await this.prisma.favorites.create({ data: {} });

      await this.prisma.artist.update({
        where: { id: artistId },
        data: { favoritesId: createFavs.id },
      });
    } else {
      await this.prisma.artist.update({
        where: { id: artistId },
        data: { favoritesId: favorites[0].id },
      });
    }
    return artist;
  }

  async deleteArtistFromFav(artistId: string) {
    const track = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!track) throw new UnprocessableEntityException('Artist not found');
    await this.prisma.artist.update({
      where: { id: artistId },
      data: { favoritesId: null },
    });
  }
}
