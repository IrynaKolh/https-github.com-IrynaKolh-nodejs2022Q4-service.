import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';

import { CreateTrackDto, UpdateTrackDto, TrackDto } from './dto';
import { TrackService } from './track.service';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(AuthGuard('JWT'))
  @Get()
  async getAllUsers(): Promise<TrackDto[]> {
    return await this.trackService.getAllTracks();
  }

  @UseGuards(AuthGuard('JWT'))
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<TrackDto> {
    return this.trackService.getTrackById(id);
  }

  @UseGuards(AuthGuard('JWT'))
  @Post()
  // @HttpCode(StatusCodes.CREATED)
  async createUser(@Body() body: CreateTrackDto): Promise<TrackDto> {
    return await this.trackService.createTrack(body);
  }

  @UseGuards(AuthGuard('JWT'))
  @Put(':id')
  async updateUser(
    @Body() body: UpdateTrackDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TrackDto> {
    return await this.trackService.updateTrack(id, body);
  }

  @UseGuards(AuthGuard('JWT'))
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    await this.trackService.deleteTrack(id);
  }
}
