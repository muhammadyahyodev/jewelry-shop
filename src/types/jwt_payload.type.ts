import { Role } from '../roles/schemas/role.model';

export class JwtPayload {
  sub: number;
  email: string;
  is_active: boolean;
  is_bann: boolean;
  roles: Role[];
}
