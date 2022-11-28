export class RequiredItemsException extends Error {
  constructor() {
    super('Al menos debe tener un item');
  }
}
