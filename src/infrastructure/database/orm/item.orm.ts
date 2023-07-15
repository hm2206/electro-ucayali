import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductoOrm } from './producto.orm';
import { NotaOrm } from './nota.orm';

@Entity('items')
export class ItemOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  productoId: string;

  @Column('uuid')
  medidaId: string;

  @Column('uuid')
  notaId: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ProductoOrm, (producto) => producto.items)
  producto: ProductoOrm;

  @ManyToOne(() => NotaOrm, (nota) => nota.items)
  nota: NotaOrm;
}
