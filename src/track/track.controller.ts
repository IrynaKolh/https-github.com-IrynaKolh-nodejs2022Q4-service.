import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto, TrackDto } from './dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  
  @Get()
  async getAllUsers(): Promise<TrackDto[]> {
    return await this.trackService.getAllTracks()
  }

  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string): Promise<TrackDto> {
    return await this.trackService.getTrackById(id);
  }

  @Post()
  async createUser(@Body() body: CreateTrackDto): Promise<TrackDto> {
    return await this.trackService.createTrack(body);
  }

  @Put(':id')
  async updateUser(@Body() body: UpdateTrackDto, @Param('id', new ParseUUIDPipe()) id): Promise<TrackDto> {
    return await this.trackService.updateTrack(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id', new ParseUUIDPipe()) id) {
    await this.trackService.deleteTrack(id);
  }
}


