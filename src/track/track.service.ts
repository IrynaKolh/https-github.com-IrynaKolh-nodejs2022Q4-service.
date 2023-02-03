import { Injectable, NotFoundException } from '@nestjs/common';
import { tracks } from 'src/DB/db';
import { v4, validate  } from 'uuid';
import { CreateTrackDto, UpdateTrackDto, TrackDto } from './dto';
import { ArtistService } from './../artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class TrackService {
  constructor (private artistService: ArtistService, private albumService: AlbumService) {}

  async getAllTracks(): Promise<TrackDto[]> {
    return tracks;
  }

  async getTrackById(id: string): Promise<TrackDto> {
    const album = tracks.find((album) => album.id === id);
    if(!album) {
      throw new NotFoundException('Track not found!');
    }
    return album;
  }

  async createTrack(track: CreateTrackDto): Promise<TrackDto>  {
    let newTrack: TrackDto;
    const artist = await this.artistService.getArtistById(track.artistId);
    if(!this.albumService.getAlbumById(track.albumId)) {
      track.albumId = null;
    }

    if (artist){
      newTrack = {
        id: v4(),
        ...track,      
      }     
    } else {
      newTrack = {
        id: v4(),
        name: track.name,
        albumId: null,
        artistId: null,
        duration: track.duration
      }
    }
    tracks.push(newTrack);
    return newTrack;
   
  }

  async updateTrack(id: string, body: UpdateTrackDto) :  Promise<TrackDto> {
    const updatedAlbum: TrackDto = await this.getTrackById(id);
    updatedAlbum.name = body.name;
    updatedAlbum.duration = body.duration;   
    if (validate(body.artistId)) {
      updatedAlbum.artistId = body.artistId;
    } else {
      updatedAlbum.artistId = null;
    }
    if (validate(body.albumId)) {
      updatedAlbum.albumId = body.albumId;
    } else {
      updatedAlbum.albumId = null;
    }

    return updatedAlbum;
  }

  async deleteTrack(id: string) {
    const index = tracks.findIndex((album) => album.id === id);
    if(index < 0){
      throw new NotFoundException('Track not found!')
    }
    tracks.splice(index, 1);
    return "Track deleted!"
  }
}




