export enum OrderEnum {
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface OrderRequestInterface<T> {
  attribute: T;
  value: OrderEnum;
}
