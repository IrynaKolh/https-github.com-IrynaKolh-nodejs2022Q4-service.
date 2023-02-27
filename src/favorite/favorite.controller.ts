import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { FavoriteService } from './favorite.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(AuthGuard('JWT'))
  @Get()
  async getAllFavs() {
    return await this.favoriteService.getAll();
  }

  @UseGuards(AuthGuard('JWT'))
  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  async addTrackToFav(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.addTrackToFav(id);
  }

  @UseGuards(AuthGuard('JWT'))
  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTrackFromFav(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoriteService.deleteTrackFromFav(id);
  }

  @UseGuards(AuthGuard('JWT'))
  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  async addAlbumToFav(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.addAlbumToFav(id);
  }

  @UseGuards(AuthGuard('JWT'))
  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteAlbumFromFav(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoriteService.deleteAlbumFromFav(id);
  }

  @UseGuards(AuthGuard('JWT'))
  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  async addArtistToFav(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.addArtistToFav(id);
  }

  @UseGuards(AuthGuard('JWT'))
  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtistFromFav(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoriteService.deleteArtistFromFav(id);
  }
}
