import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { FavoriteDto } from './dto';
import { FavoriteService } from './favorite.service'

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
  
  @Get()
  async getAllFavs(): Promise<FavoriteDto[]> {
    return await this.favoriteService.getAll()
  }

  @Post('/track/:id')
  async addAlbumToFav(@Param('id', new ParseUUIDPipe()) id) {
    return await this.favoriteService.addAlbumToFav(id);
  }

  @Delete('/track/:id')
  async deleteAlbumFromFav(@Param('id', new ParseUUIDPipe()) id) {
    await this.favoriteService.deleteAlbumFromFav(id);
  }

  @Post('/album/:id')
  async addArtistToFav(@Param('id', new ParseUUIDPipe()) id) {
    return await this.favoriteService.addArtistToFav(id);
  }

  @Delete('/album/:id')
  async deleteArtistFromFav(@Param('id', new ParseUUIDPipe()) id) {
    await this.favoriteService.deleteArtistFromFav(id);
  }
}

