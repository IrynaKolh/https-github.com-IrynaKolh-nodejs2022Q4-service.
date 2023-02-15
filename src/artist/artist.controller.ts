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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';

import { ArtistService } from './artist.service';
import { ArtistDto, CreateArtistDto, UpdateArtistDto } from './dto';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtist(): Promise<ArtistDto[]> {
    return await this.artistService.getAllArtist();
  }

  @Get(':id')
  // @HttpCode(StatusCodes.OK)
  async getArtistById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistDto> {
    return this.artistService.getArtistById(id);
  }

  @Post()
  // @HttpCode(StatusCodes.CREATED)
  async createArtist(@Body() artist: CreateArtistDto): Promise<ArtistDto> {
    return await this.artistService.createArtist(artist);
  }

  @Put(':id')
  @HttpCode(StatusCodes.OK)
  async updateArtist(
    @Body() body: UpdateArtistDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistDto> {
    return await this.artistService.updateArtist(id, body);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    await this.artistService.deleteArtist(id);
  }
}
