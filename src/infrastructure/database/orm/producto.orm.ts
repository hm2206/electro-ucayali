import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MarcaOrm } from './marca.orm';
import { MedidaOrm } from './medida.orm';
import { DetalleOrm } from './detalle.orm';
import { ItemOrm } from './item.orm';

@Entity('productos')
export class ProductoOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  codePatrimonial: string;

  @Column({ nullable: true })
  serie: string;

  @Column({ nullable: true })
  potencia: string;

  @Column({ nullable: true })
  year: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  stock: number;

  @Column('uuid')
  marcaId: string;

  @Column('uuid')
  medidaId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => DetalleOrm, (detail) => detail.producto)
  detalle: DetalleOrm;

  @ManyToOne(() => MarcaOrm, (marca) => marca.productos)
  marca: MarcaOrm;

  @ManyToOne(() => MedidaOrm, (medida) => medida.productos)
  medida: MedidaOrm;

  @OneToMany(() => ItemOrm, (item) => item.producto)
  items: ItemOrm[];
}
