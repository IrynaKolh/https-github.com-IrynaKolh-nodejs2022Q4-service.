import { Module } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { AlbumController } from './album.controller';

import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, ArtistService, TrackService, FavoriteService],
  exports: [AlbumService],
})
export class AlbumModule {}
