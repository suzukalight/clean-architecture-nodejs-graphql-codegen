import { createDbConnection } from './infrastructure/typeorm/connection';
import { createApolloServer } from './infrastructure/apollo-server';
import { createExpressApp, createHttpServer, runHttpServer } from './infrastructure/express';

const bootstrap = async () => {
  const dbConnection = await createDbConnection();
  const expressApp = createExpressApp();
  const httpServer = createHttpServer(expressApp);
  createApolloServer(dbConnection, expressApp, httpServer);

  runHttpServer(httpServer);
};

bootstrap();
