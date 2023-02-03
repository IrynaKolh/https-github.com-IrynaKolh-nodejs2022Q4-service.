import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { albums } from 'src/DB/db';
import { v4, validate  } from 'uuid';
import { CreateAlbumDto, UpdateAlbumDto, AlbumDto } from './dto';
import { ArtistService } from './../artist/artist.service';

@Injectable()
export class AlbumService {
  constructor (private artistService: ArtistService) {}

  async getAllAlbums(): Promise<AlbumDto[]> {
    return albums;
  }

  async getAlbumById(id: string): Promise<AlbumDto> {
    const album = albums.find((album) => album.id === id);
    if(!album) {
      throw new NotFoundException('Album not found!');
    }
    return album;
  }

  async createAlbum(album: CreateAlbumDto): Promise<AlbumDto>  {
    let newAlbum: AlbumDto;
    const artist = await this.artistService.getArtistById(album.artistId);

    if (artist){
      newAlbum = {
        id: v4(),
        ...album,      
      }     
    } else {
      newAlbum = {
        id: v4(),
        name: album.name,
        year: album.year,
        artistId: null
      }
    }
    albums.push(newAlbum);
    return newAlbum;
   
  }

  async updateAlbum(id: string, body: UpdateAlbumDto) :  Promise<AlbumDto> {
    const updatedAlbum: AlbumDto = await this.getAlbumById(id);
    updatedAlbum.name = body.name;
    updatedAlbum.year = body.year;   
    if (validate(body.artistId)) {
      updatedAlbum.artistId = body.artistId;
    } else {
      updatedAlbum.artistId = null;
    }

    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    const index = albums.findIndex((album) => album.id === id);
    if(index < 0){
      throw new NotFoundException('Album not found!')
    }
    albums.splice(index, 1);
    return "Album deleted!"
  }
}



