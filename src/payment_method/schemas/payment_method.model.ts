import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PaymentMethodAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'payment-method' })
export class PaymentMethod extends Model<PaymentMethod, PaymentMethodAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;
}
