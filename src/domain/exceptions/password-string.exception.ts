export class PasswordStringException extends Error {
  constructor() {
    super('El formato de la contraseña es incorrecto');
  }
}
