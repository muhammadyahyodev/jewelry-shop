import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Brand } from '../../brand/schemas/brand.model';
import { Detail } from '../../detail/schemas/detail.model';
import { JewelryType } from '../../jewelry-type/schemas/jewelry-type.model';
import { Shop } from '../../shop/schemas/shop.model';
import { Status } from '../../status/schemas/status.model';

interface JewelryAttrs {
  photo: string;
  name: string;
  price: number;
  description: string;
}

@Table({ tableName: 'Jewelry' })
export class Jewelry extends Model<Jewelry, JewelryAttrs> {
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
  photo: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @BelongsTo(() => Status)
  statuses: Status[];

  @ForeignKey(() => Detail)
  @Column({
    type: DataType.INTEGER,
  })
  detail_id: number;

  @BelongsTo(() => Detail)
  details: Detail[];

  @ForeignKey(() => JewelryType)
  @Column({
    type: DataType.INTEGER,
  })
  jewelry_type_id: number;

  @BelongsTo(() => JewelryType)
  jewelry_types: JewelryType[];

  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
  })
  shop_id: number;

  @BelongsTo(() => Shop)
  shops: Shop[];

  @ForeignKey(() => Brand)
  @Column({
    type: DataType.INTEGER,
  })
  brand_id: number;

  @BelongsTo(() => Brand)
  brands: Brand[];
}
