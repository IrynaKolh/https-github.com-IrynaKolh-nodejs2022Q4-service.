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
  constructor(
    private readonly userService: UserService,
    private logger: MyLoggerService,
  ) {}

  @Get()
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<UserDto[]> {
    this.logger.logRequest(request, response);
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserDto> {
    this.logger.logRequest(request, response);
    return await this.userService.getUserById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(
    @Req() request: Request,
    @Res() response: Response,
    @Body() user: CreateUserDto,
  ): Promise<UserDto> {
    this.logger.logRequest(request, response);
    return new UserDto(await this.userService.createUser(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUser(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id,
  ): Promise<UserDto> {
    this.logger.logRequest(request, response);
    return new UserDto(await this.userService.updateUser(id, body));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id,
  ) {
    this.logger.logRequest(request, response);
    await this.userService.deleteUser(id);
  }
}
