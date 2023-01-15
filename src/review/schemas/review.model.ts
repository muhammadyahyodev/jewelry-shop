import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Jewelry } from '../../jewelry/schemas/jewelry.model';
import { User } from '../../user/schemas/user.model';

interface ReviewAttrs {
  rate: string;
  comment: string;
}

@Table({ tableName: 'review' })
export class Review extends Model<Review, ReviewAttrs> {
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
  rate: string;

  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @ForeignKey(() => Jewelry)
  @Column({
    type: DataType.INTEGER,
  })
  jewelry_id: number;

  @BelongsTo(() => Jewelry)
  jewelry: Jewelry[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  users: User[];
}
