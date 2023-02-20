import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto, TrackDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getAllTracks(): Promise<TrackDto[]> {
    return await this.prisma.track.findMany();
  }

  async getTrackById(id: string): Promise<TrackDto> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  async createTrack(track: CreateTrackDto): Promise<TrackDto> {
    const newTrack = await this.prisma.track.create({
      data: track,
    });
    return newTrack;
  }

  async updateTrack(
    id: string,
    body: UpdateTrackDto,
  ): Promise<TrackDto | null> {
    const foundTrack = await this.prisma.track.findUnique({ where: { id } });
    if (!foundTrack) throw new NotFoundException('Track not found');

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: body,
    });

    return updatedTrack;
  }

  async deleteTrack(id: string) {
    const foundTrack = await this.prisma.track.findUnique({ where: { id } });
    if (!foundTrack) throw new NotFoundException('Track not found');

    await this.prisma.track.delete({ where: { id } });
  }

  // async deleteArtistFromTracks(id: string) {
  //   tracks.forEach((track, index) => {
  //     if (track.artistId == id) {
  //       track.artistId = null;
  //       tracks[index] = track;
  //     }
  //   });
  // }

  // async deleteAlbumFromTracks(id: string) {
  //   tracks.forEach((track, index) => {
  //     if (track.albumId == id) {
  //       track.albumId = null;
  //       tracks[index] = track;
  //     }
  //   });
  // }

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

  // async ifAlbumExist(id: string | null) {
  //   if (id === null) {
  //     return;
  //   } else {
  //     const album = albums.find((album: AlbumDto) => album.id === id);
  //     if (!album) {
  //       throw new BadRequestException('Album not found!');
  //     }
  //     return album;
  //   }
  // }
}
