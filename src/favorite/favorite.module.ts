import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Module({
  providers: [FavoriteService, ArtistService, AlbumService, TrackService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
