import { isUuid, uuid } from 'uuidv4';
import { IdentifyUUIDException } from '../exceptions/identify-uuid.exception';

export class IdentifyUUID {
  private _value: string;

  constructor(value?: string) {
    if (value) {
      this._validateUuid(value);
      this._value = value;
    } else {
      this._value = uuid();
    }
  }

  private _validateUuid(value: string): void {
    const isValid = isUuid(value);
    if (!isValid) throw new IdentifyUUIDException();
  }

  getValue(): string {
    return this._value;
  }

  toString() {
    return this._value;
  }
}
