import { PropertyRequiredError, IllegalArgumentError } from 'common';

import { Role, RoleType } from '../common/Role';

export type UserDto = {
  id: string;
  email: string;
  roles: RoleType[];

  createdAt?: Date;
  updatedAt?: Date;
};

export const denyIllegalRoles = (roles: string[]) => {
  if (!roles) throw new PropertyRequiredError('roles');
  if (!roles.length) throw new IllegalArgumentError('1つ以上のロールが必要です');
  roles.forEach((role) => new Role(role as RoleType));
};

export const denyIllegalUserDto = (user: UserDto) => {
  if (!user) throw new PropertyRequiredError('user');
  if (!user.id) throw new PropertyRequiredError('id');
  if (!user.email) throw new PropertyRequiredError('email');

  denyIllegalRoles(user.roles);
};
