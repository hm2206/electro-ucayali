import { BaseEntity } from 'src/shared/base.entity';
import { NoneEmptyString } from '../value-objects/none-empty-string';

export class Medida extends BaseEntity {
  private name: NoneEmptyString;
  private description: NoneEmptyString;

  setName(name: NoneEmptyString) {
    this.name = name;
  }

  getName() {
    return this.name.toString();
  }

  setDescription(description: NoneEmptyString) {
    this.description = description;
  }

  getDescription() {
    return this.description.toString();
  }
}
