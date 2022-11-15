import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';

export class BaseEntity {
  private id: IdentifyUUID;
  private createdAt: Date;
  private updatedAt: Date;

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
  }
}
