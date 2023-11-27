import { BaseEntity } from 'src/shared/base.entity';
import { NoneEmptyString } from '../value-objects/none-empty-string';

export class Lugar extends BaseEntity {
  private name: string;
  private description: string;
  private state: boolean;

  setName(name: NoneEmptyString): void {
    this.name = name.getValue();
  }

  getName(): string {
    return this.name;
  }

  setDescription(description: NoneEmptyString) {
    this.description = description.getValue();
  }

  getDescription(): string {
    return this.description;
  }

  setState(value: boolean) {
    this.state = value;
  }

  getState() {
    return this.state;
  }
}
