import dotenv from 'dotenv';
import { Express, Request } from 'express';
import path from 'path';
import { Server } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { Connection } from 'typeorm';

import { ApolloServerContext } from './types';
import { resolvers } from './resolvers';

dotenv.config();

/**
 * リクエストごとのコンテキスト情報を生成
 * @param req Express Request
 * @param dbConnection TypeORM Connection
 */
const getContext = async (
  _req: Request,
  dbConnection: Connection,
): Promise<ApolloServerContext> => ({ dbConnection });

/**
 * サーバをセットアップ
 * @param dbConnection TypeORM Connection
 * @param expressApp Express app instance
 * @param httpServer http.Server instance
 */
export const createApolloServer = async (
  dbConnection: Connection,
  expressApp: Express,
  httpServer: Server,
): Promise<ApolloServer> => {
  // Configure GraphQL Server
  const schema = loadSchemaSync(path.join(__dirname, '../../../../schema/schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });
  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
  });

  // Create GraphQL Server and Apply to Express
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    context: ({ req }) => getContext(req, dbConnection),
  });
  server.applyMiddleware({ app: expressApp, path: '/graphql' });
  server.installSubscriptionHandlers(httpServer);

  return server;
};
