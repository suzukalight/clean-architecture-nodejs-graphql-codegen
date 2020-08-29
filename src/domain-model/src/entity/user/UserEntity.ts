import { User } from 'schema';
import { PropertyRequiredError, IllegalArgumentError, ValidationError } from 'common';

import { ID } from '../common/ID';
import { Email } from '../common/Email';
import { Role, RoleTypes, RoleType } from '../common/Role';
import { ConflictError } from 'common';

const isValidRoles = (roles: RoleType[]) => {
  if (!roles) throw new PropertyRequiredError('roles');
  if (!roles.length) throw new IllegalArgumentError('1つ以上のロールが必要です');
  roles.forEach((role) => new Role(role));
  return true;
};

const isValidArguments = (user: User) => {
  if (!user) throw new PropertyRequiredError('user');
  if (!user.id) throw new PropertyRequiredError('id');
  if (!user.email) throw new PropertyRequiredError('email');
  isValidRoles(user.roles);
  return true;
};

export class UserEntity {
  private id: ID;
  private email: Email;
  private roles: Role[] = [new Role(RoleTypes.Anonymous)];

  constructor(user: User) {
    isValidArguments(user);
    this.id = new ID(user.id);
    this.email = new Email(user.email);
    this.roles = user.roles.map((role) => new Role(role));
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRoles() {
    return this.roles;
  }

  setId(id: ID) {
    this.id = id;
    this.isValid();
  }

  setEmail(email: Email) {
    this.email = email;
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
    const newRoles = this.roles?.filter((role) => role.isEqual(targetRole));
    if (!newRoles.length) {
      throw new ValidationError('すべてのロールを削除することになる操作はできません');
    }

    this.updateRoles(newRoles);
  }

  toJSON(): User {
    return {
      id: this.id.toString(),
      email: this.email.toString(),
      roles: this.roles.map((role) => role.toString()),
    };
  }

  isValid(): boolean {
    return isValidArguments(this.toJSON());
  }
}
