import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MarcaOrm } from './marca.orm';

@Entity('productos')
export class ProductoOrm {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => MarcaOrm, (marca) => marca.productos)
  marca: MarcaOrm;
}
