import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface JewelryTypeAttrs {
  name: string;
}

@Table({ tableName: 'jewelry-type' })
export class JewelryType extends Model<JewelryType, JewelryTypeAttrs> {
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
}
