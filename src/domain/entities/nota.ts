import { BaseEntity } from 'src/shared/base.entity';
import { NotaTypeEnum } from '../enums/nota.enum';
import { NoneEmptyString } from '../value-objects/none-empty-string';
import { Area } from './area';
import { Item } from './item';
import { Lugar } from './lugar';

export class Nota extends BaseEntity {
  private code: NoneEmptyString;
  private date: Date;
  private documentCrp: NoneEmptyString;
  private type: NotaTypeEnum;
  private observation?: string;
  private area: Area;
  private lugar: Lugar;
  private items: Item[] = [];

  setCode(code: NoneEmptyString) {
    this.code = code;
  }

  getCode() {
    return this.code.toString();
  }

  setDate(date: Date) {
    this.date = date;
  }

  getDate() {
    return this.date;
  }

  setDocumentCrp(documentCrp: NoneEmptyString) {
    this.documentCrp = documentCrp;
  }

  getDocumentCrp() {
    return this.documentCrp.toString();
  }

  setType(type: NotaTypeEnum) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setObservation(observation: string | undefined) {
    this.observation = observation;
  }

  getObservation() {
    return this.observation;
  }

  setArea(area: Area) {
    this.area = area;
  }

  getArea() {
    return this.area;
  }

  setLugar(lugar: Lugar) {
    this.lugar = lugar;
  }

  getLugar() {
    return this.lugar;
  }

  addItem(item: Item) {
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }

  removeItem(item: Item) {
    this.items = this.items.filter((i) => i.getId() != item.getId());
  }
}
