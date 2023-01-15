import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RegionAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, RegionAttrs> {
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
  number: string;
}
