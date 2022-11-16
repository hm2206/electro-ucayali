import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined } from 'class-validator';
import { UserCreateRequest } from 'src/application/users/user-create.service';
import { EmailString } from 'src/domain/value-objects/email-string';
import { PasswordString } from 'src/domain/value-objects/password-string';

export class UserCreateDto extends UserCreateRequest {
  @IsDefined()
  @Transform(({ value }) => new EmailString(value))
  email: EmailString;

  @IsDefined()
  @Transform(({ value }) => new PasswordString(value))
  password: PasswordString;

  @IsDefined()
  @IsBoolean()
  isAdmin: boolean;
}
