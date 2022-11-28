import { BaseEntity } from 'src/shared/base.entity';
import { NoneEmptyString } from '../value-objects/none-empty-string';

export class Lugar extends BaseEntity {
  private name: NoneEmptyString;
  private description: NoneEmptyString;

  setName(name: NoneEmptyString): void {
    this.name = name;
  }

  getName(): string {
    return this.name.getValue();
  }

  setDescription(description: NoneEmptyString) {
    this.description = description;
  }

  getDescription(): string {
    return this.description.getValue();
  }
}
