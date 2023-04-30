import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MarcaOrm } from './marca.orm';
import { MedidaOrm } from './medida.orm';

@Entity('productos')
export class ProductoOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  codePatrimonial: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  stock: number;

  @Column('simple-json')
  attributos: string;

  @Column('uuid')
  marcaId: string;

  @Column('uuid')
  medidaId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => MarcaOrm, (marca) => marca.productos)
  marca: MarcaOrm;

  @ManyToOne(() => MedidaOrm, (medida) => medida.productos)
  medida: MedidaOrm;
}
