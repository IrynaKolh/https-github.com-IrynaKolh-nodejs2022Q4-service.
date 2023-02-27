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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';

import { ArtistService } from './artist.service';
import { ArtistDto, CreateArtistDto, UpdateArtistDto } from './dto';

@ApiTags('Artist')
@ApiBearerAuth('access-token')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseGuards(AuthGuard('JWT'))
  @Get()
  async getAllArtist(): Promise<ArtistDto[]> {
    return await this.artistService.getAllArtist();
  }

  @UseGuards(AuthGuard('JWT'))
  @Get(':id')
  // @HttpCode(StatusCodes.OK)
  async getArtistById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistDto> {
    return this.artistService.getArtistById(id);
  }

  @UseGuards(AuthGuard('JWT'))
  @Post()
  // @HttpCode(StatusCodes.CREATED)
  async createArtist(@Body() artist: CreateArtistDto): Promise<ArtistDto> {
    return await this.artistService.createArtist(artist);
  }

  @UseGuards(AuthGuard('JWT'))
  @Put(':id')
  @HttpCode(StatusCodes.OK)
  async updateArtist(
    @Body() body: UpdateArtistDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistDto> {
    return await this.artistService.updateArtist(id, body);
  }

  @UseGuards(AuthGuard('JWT'))
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    await this.artistService.deleteArtist(id);
  }
}
