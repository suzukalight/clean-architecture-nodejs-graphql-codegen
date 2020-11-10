import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { AuthEmailPassword } from '../../repository/typeorm/auth/entity/AuthEmailPassword';

export const createDbConnection = async () => {
  return createConnection({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'docker',
    password: 'docker',
    database: 'graphql_clean_dev_auth_local',
    entities: [AuthEmailPassword],
    synchronize: false,
    logging: false,
  });
};
