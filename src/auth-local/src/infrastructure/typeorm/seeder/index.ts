import { seedAll } from './seedAll';

import { createDbConnection } from '../connection';

const runSeedAll = async () => {
  const dbConnection = await createDbConnection();

  await seedAll(dbConnection);

  process.exit();
};

runSeedAll();
