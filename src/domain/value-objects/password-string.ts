import * as bcrypt from 'bcrypt';
import { PasswordStringException } from '../exceptions/password-string.exception';

export class PasswordString {
  static minLength = 8;
  static maxLength = 255;
  static saltOrRounds = 10;

  private textPlain: string;
  private _value: string;

  constructor(_value: string) {
    if (
      _value.length < PasswordString.minLength ||
      _value.length > PasswordString.maxLength
    ) {
      throw new PasswordStringException();
    }

    this.textPlain = _value;
    this._value = bcrypt.hashSync(_value, PasswordString.saltOrRounds);
  }

  getValue(): string {
    return this._value;
  }

  toString(): string {
    return this._value;
  }

  getTextPlain(): string {
    return this.textPlain;
  }

  compareHash(hash: string): boolean {
    return bcrypt.compareSync(this.textPlain, hash);
  }
}
