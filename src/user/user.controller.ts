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
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MyLoggerService } from 'src/logger/logger.service';
import { CreateUserDto, UpdatePasswordDto, UserDto } from './dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    return new UserDto(await this.userService.createUser(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUser(
    @Body() body: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id,
  ): Promise<UserDto> {
    return new UserDto(await this.userService.updateUser(id, body));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id) {
    await this.userService.deleteUser(id);
  }
}
