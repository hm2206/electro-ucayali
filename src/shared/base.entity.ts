import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';

export class BaseEntity {
  protected id: IdentifyUUID;
  protected createdAt: Date;
  protected updatedAt: Date;

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
      this[attr] = new classField(this[attr]);
    });
  }
}
