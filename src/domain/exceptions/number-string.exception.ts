export class NumberStringException extends Error {
  constructor() {
    super('El valor solo puede ser numeros');
  }
}
