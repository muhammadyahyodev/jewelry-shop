import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { District } from '../../district/schemas/district.model';
import { Region } from '../../region/schemas/region.model';
import { User } from '../../user/schemas/user.model';

interface UserAddressCreationAttrs {}

@Table({ tableName: 'user-address' })
export class UserAddress extends Model<UserAddress, UserAddressCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  users: User[];

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @BelongsTo(() => Region)
  regions: Region[];

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  district_id: number;

  @BelongsTo(() => District)
  districts: District[];

  @Column({
    type: DataType.STRING,
  })
  street: string;

  @Column({
    type: DataType.INTEGER,
  })
  house_number: number;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  info: string;
}
