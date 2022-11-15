export class NoneEmptyStringException extends Error {
  constructor() {
    super('El valor no puede estár vacío');
  }
}
