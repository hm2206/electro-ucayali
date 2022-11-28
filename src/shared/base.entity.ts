import { plainToClassFromExist } from 'class-transformer';
import { IdentifyUUID } from 'src/domain/value-objects/identify-uuid';

export class BaseEntity {
  protected id: string;
  protected createdAt = new Date();
  protected updatedAt = new Date();

  constructor() {
    this.id = new IdentifyUUID().toString();
  }

  getId(): string {
    return this.id.toString();
  }

  setId(id: IdentifyUUID): void {
    this.id = id.toString();
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
    const classNew = plainToClassFromExist(this, partial);
    Object.assign(this, classNew);
  }
}
