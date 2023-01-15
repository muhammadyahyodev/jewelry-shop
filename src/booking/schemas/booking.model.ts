import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from '../../cart/schemas/cart.model';
import { PaymentMethod } from '../../payment_method/schemas/payment_method.model';
import { Status } from '../../status/schemas/status.model';

interface BookingAttrs {
  cart_id: number;
  delivery: boolean;
  payment_method_id: number;
  start_time: string;
  end_time: string;
  status: string;
}

@Table({ tableName: 'booking' })
export class Booking extends Model<Booking, BookingAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
  })
  cart_id: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  delivery: boolean;

  @ForeignKey(() => PaymentMethod)
  @Column({
    type: DataType.INTEGER,
  })
  payment_method_id: number;

  @BelongsTo(() => PaymentMethod)
  payment_methods: PaymentMethod[];

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
