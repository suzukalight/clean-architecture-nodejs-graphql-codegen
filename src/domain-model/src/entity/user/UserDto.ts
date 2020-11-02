import { PropertyRequiredError, IllegalArgumentError } from 'common';

import { Role, RoleType } from '../common/Role';
import { TimeStampTypes, denyDoesNotHaveRequiredProperties } from '../utils';

export type UserDto = {
  id: string;
  roles: RoleType[];
} & TimeStampTypes;

export const denyIllegalRoles = (roles: string[]) => {
  if (!roles) throw new PropertyRequiredError('roles');
  if (!roles.length) throw new IllegalArgumentError('1つ以上のロールが必要です');
  roles.forEach((role) => new Role(role as RoleType));
};

export const denyIllegalUserDto = (user: UserDto) => {
  if (!user) throw new PropertyRequiredError('user');
  denyDoesNotHaveRequiredProperties(user, ['id', 'roles']);
  denyIllegalRoles(user.roles);
};
