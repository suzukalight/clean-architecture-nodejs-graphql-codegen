import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { User } from '../../repository/typeorm/user/entity/User';
import { Todo } from '../../repository/typeorm/todo/entity/Todo';
import { AuthEmailPassword } from '../../repository/typeorm/auth/entity/AuthEmailPassword';

export const createDbConnection = async () => {
  return createConnection({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'docker',
    password: 'docker',
    database: 'graphql_clean_dev',
    entities: [User, Todo, AuthEmailPassword],
    synchronize: false,
    logging: false,
  });
};
