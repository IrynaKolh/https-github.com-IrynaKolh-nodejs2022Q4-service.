import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdatePasswordDto, UserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('JWT'))
  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return await this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('JWT'))
  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard('JWT'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    return new UserDto(await this.userService.createUser(user));
  }

  @UseGuards(AuthGuard('JWT'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUser(
    @Body() body: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id,
  ): Promise<UserDto> {
    return new UserDto(await this.userService.updateUser(id, body));
  }

  @UseGuards(AuthGuard('JWT'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id) {
    await this.userService.deleteUser(id);
  }
}
