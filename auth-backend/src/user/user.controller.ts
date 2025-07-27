import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiQuery } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AuthGuard } from 'src/tools/guards/auth/auth.guard';
import { Roles } from 'src/tools/decorators/roles.decorators';
import { RoleGuard } from 'src/tools/guards/role/role.guard';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRoles } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.userService.register(dto);
  }

  @Post('registerAdmin')
  async addAdmin(@Body() dto: CreateAdminDto) {
    return this.userService.addAdmin(dto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.userService.verifyOtp(dto);
  }

  @Post('resend-otp')
  async resendOtp(@Body() dto: ResendOtpDto) {
    return this.userService.resendOtp(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto, @Req() req: Request) {
    return this.userService.login(dto, req);
  }

  @Post('refresh-token')
  async refreshAccessToken(@Body() dto: RefreshTokenDto) {
    return this.userService.refreshAccessToken(dto);
  }

  @UseGuards(AuthGuard)
  @Patch('update-password')
  async updatePassword(@Req() req: Request, @Body() dto: UpdatePasswordDto) {
    return this.userService.updatePassword(req['user'], dto);
  }

  @Roles(UserRoles.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Roles(UserRoles.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  // @Roles(UserRoles.ADMIN)
  // @UseGuards(RoleGuard)
  // @UseGuards(AuthGuard)
  @Get()
  @ApiQuery({ name: 'firstName', required: false })
  @ApiQuery({ name: 'lastName', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'phoneNumber', required: false })
  @ApiQuery({ name: 'role', enum: UserRoles, required: false })
  @ApiQuery({ name: 'regionId', required: false })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['createdAt', 'name'],
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['asc', 'desc'],
    example: 'desc',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('email') email?: string,
    @Query('phoneNumber') phoneNumber?: string,
    @Query('role') role?: UserRoles,
    @Query('regionId') regionId?: string,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userService.findAllUser({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      regionId,
      sortBy,
      sortOrder,
      page,
      limit,
    });
  }
}
