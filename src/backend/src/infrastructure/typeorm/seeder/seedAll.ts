import { Connection } from 'typeorm';

import { seedUsers } from './User';
import { seedTodo } from './Todo';

export const seedAll = async (dbConnection: Connection) => {
  const [admin, member, anonymous] = await seedUsers(dbConnection);

  await seedTodo(dbConnection, admin, 'todo #1');
  await seedTodo(dbConnection, admin, 'todo #2');
  await seedTodo(dbConnection, member, 'todo #3');
  await seedTodo(dbConnection, member, 'todo #4');
};
