import { Module } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, TrackService, AlbumService, FavoriteService],
  exports: [ArtistService],
})
export class ArtistModule {}
