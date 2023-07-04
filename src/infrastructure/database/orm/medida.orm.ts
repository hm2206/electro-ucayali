import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductoOrm } from './producto.orm';
import { ItemOrm } from './item.orm';

@Entity('medidas')
export class MedidaOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProductoOrm, (producto) => producto.medida)
  productos: ProductoOrm[];

  @OneToMany(() => ItemOrm, (item) => item.medida)
  items: ItemOrm[];
}
