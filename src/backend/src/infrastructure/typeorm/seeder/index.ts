import { Connection } from 'typeorm';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';
import { RoleTypes, Role } from 'domain-model/src/entity/common/Role';
import { encryptPassword } from 'domain-model/src/entity/common/Password';

import { createDbConnection } from '../connection';
import { UserRepository } from '../../../repository/typeorm/user/repository/User';
import { TodoRepository } from '../../../repository/typeorm/todo/repository/Todo';
import { AuthEmailPasswordRepository } from '../../../repository/typeorm/auth/repository/AuthEmailPassword';

/**
 * ユーザを3名作成（Admin, Member, Anonymous）
 * @param dbConnection
 */
const seedUsers = async (dbConnection: Connection) => {
  const repository = new UserRepository(dbConnection);

  const admin = { email: 'admin@email.com' };
  const adminEntity = await repository.create(admin);
  const adminRole = new Role(RoleTypes.Admin);
  const memberRole = new Role(RoleTypes.Member);
  const anonymousRole = new Role(RoleTypes.Anonymous);
  adminEntity.updateRoles([adminRole, memberRole, anonymousRole]);
  await repository.update(adminEntity);

  const member = { email: 'member@email.com' };
  const memberEntity = await repository.create(member);
  memberEntity.updateRoles([adminRole, memberRole]);
  await repository.update(memberEntity);

  const anonymous = { email: 'anonymous@email.com' };
  const anonymousEntity = await repository.create(anonymous);

  return [adminEntity, memberEntity, anonymousEntity];
};

/**
 * 指定されたユーザのEmail認証を作成
 * @param dbConnection
 * @param user
 */
const seedAuth = async (dbConnection: Connection, user: UserEntity) => {
  const repository = new AuthEmailPasswordRepository(dbConnection);

  const auth = {
    userId: user.getId().toString(),
    email: user.getEmail().toString(),
    passwordEncrypted: await encryptPassword('password1234'),
  };
  return repository.create(auth);
};

/**
 * 指定されたユーザのTODOアイテムを作成
 * @param dbConnection
 * @param user
 * @param title
 */
const seedTodo = async (dbConnection: Connection, user: UserEntity, title?: string) => {
  const repository = new TodoRepository(dbConnection);

  const todo = { ownerId: user.getId().toString(), title: title || `todo` };

  return repository.create(todo);
};

/**
 * Seed実行
 */
const seedAll = async () => {
  const dbConnection = await createDbConnection();
  const [admin, member, anonymous] = await seedUsers(dbConnection);

  await seedAuth(dbConnection, admin);
  await seedAuth(dbConnection, member);
  await seedAuth(dbConnection, anonymous);

  await seedTodo(dbConnection, admin, 'todo #1');
  await seedTodo(dbConnection, admin, 'todo #2');
  await seedTodo(dbConnection, member, 'todo #3');
  await seedTodo(dbConnection, member, 'todo #4');

  process.exit();
};

seedAll();
