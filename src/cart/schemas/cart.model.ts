import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Jewelry } from '../../jewelry/schemas/jewelry.model';
import { Status } from '../../status/schemas/status.model';
import { User } from '../../user/schemas/user.model';

interface CartAttrs {
  jewelry_id: number;
  customer_id: number;
  start_time: string;
  end_time: string;
  status: string;
}

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart, CartAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Jewelry)
  @Column({
    type: DataType.INTEGER,
  })
  jewelry_id: number;

  @BelongsTo(() => Jewelry)
  jewelries: Jewelry[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  users: User[];

  @Column({
    type: DataType.STRING,
  })
  start_time: string;

  @Column({
    type: DataType.STRING,
  })
  end_time: string;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @BelongsTo(() => Status)
  status: Status[];
}
