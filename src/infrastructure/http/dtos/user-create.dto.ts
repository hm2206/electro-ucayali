import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined } from 'class-validator';
import { UserCreateRequest } from 'src/application/users/user-create.service';
import { EmailString } from 'src/domain/value-objects/email-string';
import { PasswordString } from 'src/domain/value-objects/password-string';

export class UserCreateDto extends UserCreateRequest {
  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => new EmailString(value))
  email: EmailString;

  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => new PasswordString(value))
  password: PasswordString;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isAdmin: boolean;
}
