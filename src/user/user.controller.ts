import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import { CreateUserDto, UpdatePasswordDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}
  
  @Get()
  async getAllUsers(): Promise<UserDto[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserDto> {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    return await this.userService.createUser(user);
  }

  @Put(':id')
  async updateUser(@Body() body: UpdatePasswordDto, @Param('id', new ParseUUIDPipe()) id): Promise<UserDto> {
    return await this.userService.updateUser(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id', new ParseUUIDPipe()) id) {
    await this.userService.deleteUser(id);
  }
     
}
