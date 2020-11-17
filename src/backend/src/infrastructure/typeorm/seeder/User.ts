import { Connection } from 'typeorm';
import { RoleTypes, Role, RoleType } from 'common';
import { UserRepository } from 'domain-model';

import { GqlUserRepository } from '../../../repository/typeorm/user/repository/User';

export const seedUser = async (repository: UserRepository, roles: RoleType[]) => {
  const user = {};
  const userEntity = await repository.create(user);
  userEntity.updateRoles(roles.map((role) => new Role(role)));
  await repository.update(userEntity);

  return userEntity;
};

export const seedUsers = async (dbConnection: Connection) => {
  const repository = new GqlUserRepository(dbConnection);

  const adminEntity = await seedUser(repository, [RoleTypes.Admin, RoleTypes.Member]);
  const memberEntity = await seedUser(repository, [RoleTypes.Member]);
  const anonymousEntity = await seedUser(repository, [RoleTypes.Anonymous]);

  return [adminEntity, memberEntity, anonymousEntity];
};
