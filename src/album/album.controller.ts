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
import { CreateAlbumDto, UpdateAlbumDto, AlbumDto } from './dto';
import { AlbumService } from './album.service';
import { StatusCodes } from 'http-status-codes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums(): Promise<AlbumDto[]> {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getUAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.getAlbumById(id);
  }

  @Post()
  // @HttpCode(StatusCodes.CREATED)
  async createAlbum(@Body() body: CreateAlbumDto): Promise<AlbumDto> {
    return await this.albumService.createAlbum(body);
  }

  @Put(':id')
  async updateAlbum(
    @Body() body: UpdateAlbumDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AlbumDto> {
    return await this.albumService.updateAlbum(id, body);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.albumService.deleteAlbum(id);
  }
}
