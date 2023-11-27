import { BaseEntity } from 'src/shared/base.entity';
import { NoneEmptyString } from '../value-objects/none-empty-string';

export class Marca extends BaseEntity {
  private name: string;
  private description: string;
  private state: boolean;

  setName(name: NoneEmptyString) {
    this.name = name.getValue();
  }

  getName() {
    return this.name;
  }

  setDescription(description: NoneEmptyString) {
    this.description = description.getValue();
  }

  getDescription() {
    return this.description;
  }

  setState(state: boolean) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}
