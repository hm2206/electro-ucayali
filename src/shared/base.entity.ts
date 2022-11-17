import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';
import { ParseValue } from './utils/parse-value';

export class BaseEntity {
  protected id: IdentifyUUID;
  protected createdAt = new Date();
  protected updatedAt = new Date();

  protected fieldEspecial = {};

  constructor() {
    this.id = new IdentifyUUID();
  }

  getId(): string {
    return this.id.getValue();
  }

  setId(id: IdentifyUUID): void {
    this.id = id;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  load(partial: Partial<any>) {
    Object.assign(this, partial);
    Object.keys(this.fieldEspecial).forEach((attr) => {
      const classField = this.fieldEspecial[attr];
      const classSource = this[attr];
      const value = new ParseValue(classSource);
      this[attr] = new classField(value.getValue());
    });
  }
}
