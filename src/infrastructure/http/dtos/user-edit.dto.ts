import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDefined } from 'class-validator';
import { UserEditRequest } from 'src/application/users/user-edit.service';
import { EmailString } from 'src/domain/value-objects/email-string';
import { PasswordString } from 'src/domain/value-objects/password-string';

export class UserEditDto implements UserEditRequest {
  @ApiProperty()
  @IsDefined()
  @Type(() => EmailString)
  @Transform(({ value }) => new EmailString(value))
  email: EmailString;

  @ApiProperty()
  @IsDefined()
  @Type(() => PasswordString)
  @Transform(({ value }) => new PasswordString(value))
  password?: PasswordString;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  state: boolean;
}
