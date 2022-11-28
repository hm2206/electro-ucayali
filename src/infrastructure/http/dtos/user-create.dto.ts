import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserCreateRequest } from 'src/application/users/user-create.service';
import { PasswordString } from 'src/domain/value-objects/password-string';

export class UserCreateDto extends UserCreateRequest {
  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @MinLength(PasswordString.minLength)
  @MaxLength(PasswordString.maxLength)
  password: string;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isAdmin: boolean;
}
