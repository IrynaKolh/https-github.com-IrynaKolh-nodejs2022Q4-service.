import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto, AlbumDto } from './dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllUsers(): Promise<AlbumDto[]> {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string): Promise<AlbumDto> {
    return await this.albumService.getAlbumById(id);
  }

  @Post()
  async createUser(@Body() body: CreateAlbumDto): Promise<AlbumDto> {
    return await this.albumService.createAlbum(body);
  }

  @Put(':id')
  async updateUser(
    @Body() body: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe()) id,
  ): Promise<AlbumDto> {
    return await this.albumService.updateAlbum(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id) {
    await this.albumService.deleteAlbum(id);
  }
}
