import { ValidationError, ConflictError, ID, Role, RoleTypes, RoleType } from 'common';

import { UserDto, denyIllegalUserDto } from './UserDto';

export class UserEntity {
  private id: ID;
  private roles: Role[] = [new Role(RoleTypes.Anonymous)];

  constructor(user: UserDto) {
    denyIllegalUserDto(user);
    this.id = new ID(user.id);
    this.roles = user.roles.map((role) => new Role(role as RoleType));
  }

  getId() {
    return this.id;
  }

  getRoles() {
    return this.roles;
  }

  setId(id: ID) {
    this.id = id;
    this.isValid();
  }

  updateRoles(newRoles: Role[]) {
    this.roles = newRoles;
    this.isValid();
  }

  addRole(targetRole: Role) {
    if (this.roles.some((role) => role.isEqual(targetRole))) {
      throw new ConflictError('そのロールはすでに保持しています');
    }

    this.updateRoles([...(this.roles || []), targetRole]);
  }

  removeRole(targetRole: Role) {
    if (!this.roles.some((role) => role.isEqual(targetRole))) {
      throw new ConflictError('そのロールを持っていません');
    }

    const newRoles = this.roles?.filter((role) => !role.isEqual(targetRole));
    if (!newRoles.length) {
      throw new ValidationError('すべてのロールを削除することになる操作はできません');
    }

    this.updateRoles(newRoles);
  }

  toDto(): UserDto {
    return {
      id: this.id.toString(),
      roles: this.roles.map((role) => role.toString()),
    };
  }

  isValid(): boolean {
    try {
      denyIllegalUserDto(this.toDto());
    } catch {
      return false;
    }
    return true;
  }
}
