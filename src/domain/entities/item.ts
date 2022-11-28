import { BaseEntity } from 'src/shared/base.entity';
import { NumberString } from '../value-objects/number-string';
import { Medida } from './medida';
import { Nota } from './nota';
import { Producto } from './producto';

export class Item extends BaseEntity {
  private codePatrimonial: NumberString;
  private amount: number;
  private producto: Producto;
  private medida: Medida;
  private nota: Nota;

  getCodePatrimonial() {
    return this.codePatrimonial.toString();
  }

  setCodePatrimonial(codePatrimonial: NumberString) {
    this.codePatrimonial = codePatrimonial;
  }

  getAmount() {
    return this.amount;
  }

  setAmount(amount: number) {
    this.amount = amount;
  }

  getProducto() {
    return this.producto;
  }

  setProducto(producto: Producto) {
    this.producto = producto;
  }

  getMedida() {
    return this.medida;
  }

  setMedida(medida: Medida) {
    this.medida = medida;
  }

  getNota() {
    return this.nota;
  }

  setNota(nota: Nota) {
    this.nota = nota;
  }
}
