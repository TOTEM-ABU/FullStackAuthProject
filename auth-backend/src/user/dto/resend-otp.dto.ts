import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResendOtpDto {
  @ApiProperty({ example: 'aziz@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;
}
