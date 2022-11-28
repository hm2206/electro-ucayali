import { BaseEntity } from 'src/shared/base.entity';
import { NoneEmptyString } from '../value-objects/none-empty-string';

export class Marca extends BaseEntity {
  private name: NoneEmptyString;
  private description: NoneEmptyString;

  setName(name: NoneEmptyString) {
    this.name = name;
  }

  getName() {
    return this.name.getValue();
  }

  setDescription(description: NoneEmptyString) {
    this.description = description;
  }

  getDescription() {
    return this.description.getValue();
  }
}
