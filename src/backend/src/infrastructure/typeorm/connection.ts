import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { User } from './entity/User';
import { Todo } from './entity/Todo';

export const createDbConnection = async () => {
  return createConnection({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'docker',
    password: 'docker',
    database: 'graphql_clean_dev',
    entities: [User, Todo],
    synchronize: false,
    logging: false,
  }).catch((error) => console.log(error));
};
