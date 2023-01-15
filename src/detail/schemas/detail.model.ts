import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Material } from '../../material/schemas/material.model';

interface DetailAttrs {
  name: string;
  gold_content: string;
  color: string;
}

@Table({ tableName: 'detail' })
export class Detail extends Model<Detail, DetailAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.FLOAT,
  })
  weight: number;

  @Column({
    type: DataType.STRING,
  })
  gold_content: string;

  @Column({
    type: DataType.STRING,
  })
  color: string;

  @ForeignKey(() => Material)
  @Column({
    type: DataType.INTEGER,
  })
  material_id: number;

  @BelongsTo(() => Material)
  materials: Material[];
}
