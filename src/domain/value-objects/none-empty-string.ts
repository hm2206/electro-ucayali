import { NoneEmptyStringException } from '../exceptions/none-empty-string.exception';

export class NoneEmptyString {
  protected _value: string;
  constructor(_value: string) {
    if (_value === '') throw new NoneEmptyStringException();
    this._value = _value;
  }

  getValue(): string {
    return this._value;
  }

  toString() {
    return this._value;
  }
}
