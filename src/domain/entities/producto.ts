import { BaseEntity } from 'src/shared/base.entity';
import { NoneEmptyString } from '../value-objects/none-empty-string';

export class Producto extends BaseEntity {
  public id: string;
  private code: string;
  private serie?: string;
  private potencia?: string;
  private year?: number;
  private codePatrimonial?: string;
  public name: string;
  private description?: string;
  public stock: number;
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

  setSerie(serie?: string) {
    this.serie = serie;
  }

  getSerie() {
    return this.serie;
  }

  setPotencia(potencia?: string) {
    this.potencia = potencia;
  }

  getPotencia() {
    return this.potencia;
  }

  setYear(year?: number) {
    this.year = year;
  }

  getYear() {
    return this.year;
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
