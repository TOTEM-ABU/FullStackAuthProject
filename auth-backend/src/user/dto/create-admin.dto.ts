import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsUrl,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Aziz' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Azizov' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'aziz@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  @Length(4, 8)
  password: string;

  @ApiProperty({ example: '+998XXXXXXXXX' })
  @IsString()
  @IsPhoneNumber('UZ')
  phoneNumber: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  yearOfBirth: Date;

  @ApiProperty({ enum: UserRoles, example: 'ADMIN' })
  @IsString()
  role: UserRoles;
}
