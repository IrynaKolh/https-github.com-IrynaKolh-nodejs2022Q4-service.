import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateUserDto, UpdatePasswordDto, UserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<UserDto> {
    user.password = await bcrypt.hash(
      user.password,
      +process.env.CRYPT_SALT || 10,
    );
    const newUser = await this.prisma.user.create({
      data: user,
    });
    const createTime = new Date(newUser.createdAt).getTime();
    const updatedTime = new Date(newUser.updatedAt).getTime();
    return { ...newUser, createdAt: createTime, updatedAt: updatedTime };
  }

  async updateUser(id: string, user: UpdatePasswordDto): Promise<UserDto> {
    const foundUser: UserDto = await this.getUserById(id);
    const comparePassword = await bcrypt.compare(
      user.oldPassword,
      foundUser.password,
    );
    if (!comparePassword) {
      throw new ForbiddenException('Password is wrong!');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: await bcrypt.hash(
          user.newPassword,
          +process.env.CRYPT_SALT || 10,
        ),
        version: foundUser.version + 1,
        updatedAt: new Date(),
      },
    });
    const createTime = new Date(updatedUser.createdAt).getTime();
    const updatedTime = new Date(updatedUser.updatedAt).getTime();
    return { ...updatedUser, createdAt: createTime, updatedAt: updatedTime };
  }

  async deleteUser(id: string) {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    await this.prisma.user.delete({ where: { id } });
  }
}
