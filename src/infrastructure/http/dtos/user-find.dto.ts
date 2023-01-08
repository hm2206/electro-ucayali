import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { UserFindRequest } from 'src/application/users/user-find.service';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';

export class UserFindDto implements UserFindRequest {
  @ApiProperty()
  @IsDefined()
  @Transform(({ value }) => new IdentifyUUID(value))
  id: IdentifyUUID;
}
