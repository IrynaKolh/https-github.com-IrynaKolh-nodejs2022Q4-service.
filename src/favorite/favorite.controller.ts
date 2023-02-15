import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { FavoriteService } from './favorite.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async getAllFavs() {
    return await this.favoriteService.getAll();
  }

  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  async addTrackToFav(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.addTrackToFav(id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTrackFromFav(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoriteService.deleteTrackFromFav(id);
  }

  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  async addAlbumToFav(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.addAlbumToFav(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteAlbumFromFav(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoriteService.deleteAlbumFromFav(id);
  }

  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  async addArtistToFav(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.addArtistToFav(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtistFromFav(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoriteService.deleteArtistFromFav(id);
  }
}
