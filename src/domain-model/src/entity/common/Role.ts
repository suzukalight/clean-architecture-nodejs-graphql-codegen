import { Role as RoleSchema } from 'schema/types';
import { PropertyRequiredError } from 'common/error/PropertyRequired';
import { IllegalArgumentError } from 'common/error/IllegalArgument';

const validRoles = [RoleSchema.Anonymous, RoleSchema.Member, RoleSchema.Admin];

const isValid = (role: RoleSchema) => {
  if (!role) throw new PropertyRequiredError('role');
  if (!validRoles.includes(role)) throw new IllegalArgumentError(`${role} はロールではありません`);
  return true;
};

export type RoleType = RoleSchema;
export const RoleTypes = RoleSchema;

export class Role {
  private role: RoleType;

  constructor(role: RoleType) {
    isValid(role);
    this.role = role;
  }

  getRole() {
    return this.role;
  }

  toString() {
    return this.role;
  }

  isEqual(role: Role) {
    return this.role === role.toString();
  }
}

export class RoleFactory {
  public static fromSchema(role: RoleSchema) {
    return new Role(role);
  }

  public static fromSchemaArray(roles: RoleSchema[]) {
    return roles.map((role) => new Role(role));
  }
}
