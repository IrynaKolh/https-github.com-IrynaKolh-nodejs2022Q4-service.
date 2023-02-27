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
import { CreateAlbumDto, UpdateAlbumDto, AlbumDto } from './dto';
import { AlbumService } from './album.service';
import { StatusCodes } from 'http-status-codes';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Album')
@ApiBearerAuth('access-token')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(AuthGuard('JWT'))
  @Get()
  async getAllAlbums(): Promise<AlbumDto[]> {
    return await this.albumService.getAllAlbums();
  }

  @UseGuards(AuthGuard('JWT'))
  @Get(':id')
  async getUAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.getAlbumById(id);
  }

  @UseGuards(AuthGuard('JWT'))
  @Post()
  // @HttpCode(StatusCodes.CREATED)
  async createAlbum(@Body() body: CreateAlbumDto): Promise<AlbumDto> {
    return await this.albumService.createAlbum(body);
  }

  @UseGuards(AuthGuard('JWT'))
  @Put(':id')
  async updateAlbum(
    @Body() body: UpdateAlbumDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AlbumDto> {
    return await this.albumService.updateAlbum(id, body);
  }

  @UseGuards(AuthGuard('JWT'))
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.albumService.deleteAlbum(id);
  }
}
