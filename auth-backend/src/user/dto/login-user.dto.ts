import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'aziz@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;
}
