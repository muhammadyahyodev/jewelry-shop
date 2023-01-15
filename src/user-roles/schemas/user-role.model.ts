import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../../roles/schemas/role.model';
import { User } from '../../user/schemas/user.model';

interface UserRolesCreationAttrs {}

@Table({ tableName: 'user-roles' })
export class UserRole extends Model<UserRole, UserRolesCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @BelongsTo(() => User)
  users: User[];

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  role_id: number;

  @BelongsTo(() => Role)
  roles: Role[];
}
