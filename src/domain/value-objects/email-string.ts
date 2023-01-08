import { isEmail } from 'class-validator';
import { EmailStringException } from '../exceptions/email-string.exception';

export class EmailString {
  private _value: string;

  constructor(_value: string) {
    if (!isEmail(_value)) {
      throw new EmailStringException();
    }

    this._value = _value;
  }

  getValue() {
    return this._value;
  }

  toString() {
    return this._value;
  }
}
