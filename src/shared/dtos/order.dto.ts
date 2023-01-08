import { ApiProperty } from '@nestjs/swagger';
import {
  OrderEnum,
  OrderRequestInterface,
} from '../interfaces/order-request.interface';
import { IsDefined, IsString } from 'class-validator';

export class OrderDto<T> implements OrderRequestInterface<any> {
  @ApiProperty()
  @IsDefined()
  attribute: T;

  @ApiProperty()
  @IsDefined()
  @IsString()
  value: OrderEnum;
}
