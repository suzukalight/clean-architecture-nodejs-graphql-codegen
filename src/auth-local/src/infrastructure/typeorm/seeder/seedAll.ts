import { Connection } from 'typeorm';

import { seedAuth } from './Auth';

export const seedAll = async (dbConnection: Connection) => {
  await seedAuth(dbConnection, '1', 'admin@email.com');
  await seedAuth(dbConnection, '2', 'member@email.com');
  await seedAuth(dbConnection, '3', 'anonymous@email.com');
};
