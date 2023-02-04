import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteDto } from './dto';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async getAllFavs(): Promise<FavoriteDto[]> {
    return await this.favoriteService.getAll();
  }

  @Post('/track/:id')
  async addTrackToFav(@Param('id', new ParseUUIDPipe()) id) {
    return await this.favoriteService.addAlbumToFav(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFav(@Param('id', new ParseUUIDPipe()) id) {
    await this.favoriteService.deleteAlbumFromFav(id);
  }

  @Post('/album/:id')
  async addAlbumToFav(@Param('id', new ParseUUIDPipe()) id) {
    return await this.favoriteService.addAlbumToFav(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFav(@Param('id', new ParseUUIDPipe()) id) {
    await this.favoriteService.deleteAlbumFromFav(id);
  }

  @Post('/artist/:id')
  async addArtistToFav(@Param('id', new ParseUUIDPipe()) id) {
    return await this.favoriteService.addArtistToFav(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFav(@Param('id', new ParseUUIDPipe()) id) {
    await this.favoriteService.deleteArtistFromFav(id);
  }
}
