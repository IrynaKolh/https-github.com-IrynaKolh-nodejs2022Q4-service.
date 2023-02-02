import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { users } from 'src/DB/db';
import { v4, validate } from 'uuid';
import { CreateUserDto, UpdatePasswordDto, UserDto } from './dto';

@Injectable()
export class UserService {

  async getAllUsers() {
    return users;
  }

  async getUserById(id: string) {
    // if(validate(id)) {
    //   throw new BadRequestException('Opps! Invalid id!')
    // }
    const user = users.find((user) => user.id === id);
    if(!user) {
      throw new NotFoundException('User not found!')
    }
    return user;
  }

  async createUser(user: CreateUserDto) {
    const newUser = {
      id: v4(),
      ...user,
      version: 1,
      createdAt: Date.now(),
      updatedAt:  Date.now(),
    }
    users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, user: UpdatePasswordDto) {
    const updatedUser: UserDto = await this.getUserById(id);
    if (user.oldPassword !== updatedUser.password) {
      throw new ForbiddenException('Password is wrong!');
    }
    updatedUser.password = user.newPassword;
    updatedUser.updatedAt = Date.now();
    updatedUser.version = updatedUser.version + 1;

    return updatedUser;

  }

  async deleteUser(id: string) {
    const index = users.findIndex((user) => user.id === id);
    if(index < 0){
      throw new NotFoundException('User not found!')
    }
    return users.splice(index, 1)
  }

}
