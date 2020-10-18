import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { User } from '../../../src/repository/typeorm/user/entity/User';
import { Todo } from '../../../src/repository/typeorm/todo/entity/Todo';
import { AuthEmailPassword } from '../../../src/repository/typeorm/auth/entity/AuthEmailPassword';

export const createDbConnection = async () => {
  return createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities: [User, Todo, AuthEmailPassword],
    synchronize: true,
    logging: false,
  });
};
