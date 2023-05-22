import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductoOrm } from './producto.orm';

@Entity('detalles')
export class DetalleOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  productoId: string;

  @Column()
  serie: string;

  @Column()
  potencia: string;

  @Column()
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => ProductoOrm, (producto) => producto.detalle)
  @JoinColumn()
  producto: ProductoOrm;
}
