import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from './schemas/user-role.model';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectModel(UserRole) private userRoleRepository: typeof UserRole,
  ) {}

  async findAllUserWithRoles(): Promise<UserRole[]> {
    const userroles = await this.userRoleRepository.findAll({
      include: { all: true },
    });
    return userroles;
  }

  async findUserRolesById(id: number): Promise<UserRole> {
    const userRoles = await this.userRoleRepository.findByPk(id, {
      include: { all: true },
    });

    if (!userRoles) {
      throw new NotFoundException('Not found role on this user');
    }

    return userRoles;
  }

  async findByUserID(userId: number): Promise<UserRole> {
    const user = await this.userRoleRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException('Not found user');
    }

    return user;
  }

  async findByRolesID(roleId: number): Promise<UserRole> {
    const role = await this.userRoleRepository.findOne({
      where: { role_id: roleId },
    });

    if (!role) {
      throw new NotFoundException('Not found roles');
    }

    return role;
  }
}
