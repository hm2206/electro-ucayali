import { BaseEntity } from 'src/shared/base.entity';
import { IdentifyUUID } from '../value-objects/identify-uuid';
import { NoneEmptyString } from '../value-objects/none-empty-string';

export class Medida extends BaseEntity {
  private name: NoneEmptyString;
  private description: NoneEmptyString;

  protected fieldEspecial = {
    id: IdentifyUUID,
    name: NoneEmptyString,
    description: NoneEmptyString,
  };

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
