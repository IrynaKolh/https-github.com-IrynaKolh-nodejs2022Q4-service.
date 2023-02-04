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
import { ArtistService } from './artist.service';
import { ArtistDto, CreateArtistDto, UpdateArtistDto } from './dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllUsers(): Promise<ArtistDto[]> {
    return await this.artistService.getAllArtist();
  }

  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string): Promise<ArtistDto> {
    return await this.artistService.getArtistById(id);
  }

  @Post()
  async createUser(@Body() user: CreateArtistDto): Promise<ArtistDto> {
    return await this.artistService.createArtist(user);
  }

  @Put(':id')
  async updateUser(
    @Body() body: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe()) id,
  ): Promise<ArtistDto> {
    return await this.artistService.updateArtist(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id) {
    await this.artistService.deleteArtist(id);
  }
}
