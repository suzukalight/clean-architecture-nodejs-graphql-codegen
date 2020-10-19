import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

const sleep = async (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const createDbConnection = async () => {
  return createConnection({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'docker',
    password: 'docker',
    database: 'graphql_clean_dev',
    synchronize: false,
    logging: false,
  });
};

const waitConnection = async () => {
  let count = 30;
  let dbConnection: Connection | undefined;

  while (count > 0) {
    --count;
    try {
      dbConnection = await createDbConnection();
    } catch (e) {
      await sleep(1000);
      continue;
    }

    if (dbConnection?.isConnected) break;
    await sleep(1000);
  }

  process.exit();
};

waitConnection();
