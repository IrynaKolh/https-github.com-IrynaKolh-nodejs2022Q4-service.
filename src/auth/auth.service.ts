import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { TokenDto } from './dto/tokenDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  async login(user: CreateUserDto): Promise<TokenDto> {
    const authUser = await this.prisma.user.findFirst({
      where: { login: user.login },
    });
    if (!user) throw new ForbiddenException('No access');

    const compareHashPassword = await bcrypt.compare(
      user.password,
      authUser.password,
    );
    if (!compareHashPassword) throw new ForbiddenException('No access');

    const tokens = await this.getTokens(authUser.id, user.login);
    await this.updateRefreshToken(authUser.id, tokens.refreshToken);
    return tokens;
  }

  async getTokens(userId: string, login: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(id: string, token: string) {
    const tokenHash = await bcrypt.hash(token, +process.env.CRYPT_SALT || 10);

    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: tokenHash },
    });
  }

  async refresh(refreshToken: string) {
    try {
      const { userId, login } = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_KEY,
      });
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new ForbiddenException('Refresh token invalid');
      if (login !== user.login)
        throw new ForbiddenException('Refresh token invalid');

      const tokens = await this.getTokens(userId, login);
      await this.updateRefreshToken(userId, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException('No access');
    }
  }
}
