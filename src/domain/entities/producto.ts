import { BaseEntity } from 'src/shared/base.entity';
import { NoneEmptyString } from '../value-objects/none-empty-string';
import { ProductoItemInterface } from '../interfaces/producto-item.interface';

export class Producto extends BaseEntity {
  private code: string;
  private codePatrimonial?: string;
  private name: string;
  private description?: string;
  private stock: number;
  private attributos: ProductoItemInterface[];
  private medidaId: string;
  private marcaId: string;

  setCode(code: NoneEmptyString) {
    this.code = code.getValue();
  }

  getCode() {
    return this.code;
  }

  setCodePatrimonial(codePatrimonial?: string) {
    this.codePatrimonial = codePatrimonial;
  }

  getCodePatrimonial() {
    return this.codePatrimonial;
  }

  setName(name: NoneEmptyString) {
    this.name = name.getValue();
  }

  getName() {
    return this.name;
  }

  setDescription(description?: string) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setStock(stock: number) {
    this.stock = stock;
  }

  getStock() {
    return this.stock;
  }

  setAttributos(attributos: ProductoItemInterface[]) {
    this.attributos = attributos;
  }

  getAttributos() {
    return this.attributos;
  }

  setMedidaId(medidaId: string) {
    this.medidaId = medidaId;
  }

  getMedidaId() {
    return this.medidaId;
  }

  setMarcaId(marcaId: string) {
    this.marcaId = marcaId;
  }

  getMarcaId() {
    return this.marcaId;
  }
}
