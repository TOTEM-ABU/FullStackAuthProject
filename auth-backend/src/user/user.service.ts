import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/tools/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/tools/mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly mailer: MailService,
  ) {}

  async findUser(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async findAllUser(query: any) {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      regionId,
      sortBy,
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = query;

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const where: any = {
      ...(firstName && {
        firstName: { contains: firstName, mode: 'insensitive' },
      }),
      ...(lastName && {
        lastName: { contains: lastName, mode: 'insensitive' },
      }),
      ...(email && { email: { contains: email, mode: 'insensitive' } }),
      ...(phoneNumber && {
        phoneNumber: { contains: phoneNumber, mode: 'insensitive' },
      }),
      ...(role && { role }),
      ...(regionId && { regionId: Number(regionId) }),
    };

    try {
      const user = await this.prisma.user.findMany({
        where,
        ...(sortBy ? { orderBy: { [sortBy]: sortOrder } } : {}),
        skip,
        take,
      });

      const total = await this.prisma.user.count({ where });

      return {
        data: user,
        total,
        page: Number(page),
        limit: take,
        lastPage: Math.ceil(total / take),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error in get users');
    }
  }

  private generateOTP(length = 6): string {
    try {
      const digits = '0123456789';
      let otp = '';
      for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
      return otp;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Cannot generate otp!');
    }
  }

  async register(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists!');
    }

    if (
      data.role &&
      ['ADMIN', 'SUPER_ADMIN', 'CEO'].includes(data.role.toUpperCase())
    ) {
      throw new ForbiddenException(
        'You are not allowed to register as (ADMIN, SUPER_ADMIN or CEO)!',
      );
    }

    const hash = bcrypt.hashSync(data.password, 10);
    const otp = this.generateOTP();

    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...data,
          password: hash,
        },
      });

      await this.mailer.sendMail(
        data.email,
        'Your OTP Code',
        `Your OTP code is: ${otp}\n\nIt will expire in 5 minutes.`,
      );

      return newUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to register user!');
    }
  }

  async addAdmin(data: CreateAdminDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists!');
    }

    if (data.role && ['USER'].includes(data.role.toLocaleUpperCase())) {
      throw new ForbiddenException('You are not allowed register as USER!');
    }

    const hash = bcrypt.hashSync(data.password, 10);
    const otp = this.generateOTP();

    try {
      const newUser = await this.prisma.user.create({
        data: {
          ...data,
          password: hash,
        },
      });

      await this.mailer.sendMail(
        data.email,
        'Your OTP Code',
        `Your OTP code is: ${otp}\n\nIt will expire in 5 minutes.`,
      );

      return newUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to register user!');
    }
  }

  async verifyOtp(data: VerifyOtpDto) {
    try {
      const { email, otp } = data;

      const user = await this.prisma.user.findFirst({
        where: { email: email },
      });

      if (!user) throw new NotFoundException('User not found!');

      if (user.status) return { message: 'User already verified!' };

      if (data.otp !== otp) throw new BadRequestException('Invalid OTP!');

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          status: true,
        },
      });

      await this.mailer.sendMail(
        data.email,
        'Registered successfully!',
        'Thank you for registering!🫱🏼‍🫲🏽✅',
      );

      return { message: 'Email verified successfully!' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to verify otp!');
    }
  }

  async resendOtp(data: ResendOtpDto) {
    try {
      const otp = this.generateOTP();

      await this.mailer.sendMail(
        data.email,
        'Your OTP Code',
        `Your OTP code is: ${otp}\n\nIt will expire in 5 minutes.`,
      );

      return { message: 'OTP sent successfully!' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to resend OTP!');
    }
  }

  async login(data: LoginUserDto, request: Request) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: data.email },
      });

      if (!user) {
        throw new NotFoundException('User not found!');
      }

      if (!user.status) {
        throw new BadRequestException('Please verify your email first!');
      }

      const match = await bcrypt.compare(data.password, user.password);

      if (!match) {
        throw new BadRequestException('Wrong credentials!');
      }

      const payload = { id: user.id, role: user.role };

      const access_token = this.jwt.sign(payload, {
        secret: process.env.ACCESS_SECRET,
        expiresIn: '15m',
      });

      const refresh_token = this.jwt.sign(payload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      });

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      await this.prisma.user.update({
        where: { id: user.id },
        data: { refresh_token: refresh_token },
      });

      await this.mailer.sendMail(
        data.email,
        'Logged in',
        'You have successfully logged in ✅',
      );

      return { access_token, refresh_token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to login!');
    }
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) throw new NotFoundException('User not found!');

      const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10);

      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });

      return { message: 'Password updated successfully!' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update password!');
    }
  }

  async refreshAccessToken(data: RefreshTokenDto) {
    try {
      const payload = this.jwt.verify(data.refresh_token, {
        secret: process.env.REFRESH_SECRET,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user || user.refresh_token !== data.refresh_token) {
        throw new BadRequestException('Invalid refresh token!');
      }

      const payload2 = { id: user.id, role: user.role };

      const newAccessToken = this.jwt.sign(payload2, {
        secret: process.env.ACCESS_SECRET,
        expiresIn: '15m',
      });

      return {
        access_token: newAccessToken,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to refresh access token!');
    }
  }

  async updateUser(id: string, data: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({ where: { id }, data });
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update user!');
    }
  }

  async delete(id: string) {
    try {
      const remove = await this.prisma.user.delete({ where: { id } });

      if (!remove) {
        throw new NotFoundException('User not found!');
      }

      return remove;
    } catch (error) {
      console.log(error);

      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete user!');
    }
  }
}
