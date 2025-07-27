import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  oldPassword: string;

  @ApiProperty({ example: '1234' })
  @IsString()
  @Length(4, 8)
  newPassword: string;
}
