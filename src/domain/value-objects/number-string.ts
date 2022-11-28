import { NumberStringException } from '../exceptions/number-string.exception';
import { NoneEmptyString } from './none-empty-string';

export class NumberString extends NoneEmptyString {
  constructor(protected _value: string) {
    super(_value);
    const result = this.validate(_value);
    if (!result) {
      this._value = undefined;
      throw new NumberStringException();
    }
  }

  private validate(value: string): boolean {
    const regx = /^[0-9]+$/;
    return regx.test(value);
  }
}
