export class ParseValue {
  constructor(private _value: any) {}

  getValue(): any {
    return typeof this._value === 'object'
      ? this._value.toString()
      : this._value;
  }
}
