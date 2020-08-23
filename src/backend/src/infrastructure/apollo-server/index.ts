import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { Connection } from 'typeorm';

import { resolvers } from './resolvers';
import { User } from 'schema/types';
import { UserRepository } from '../../repository/typeorm/User';
import { ApolloServerContext } from './type';

dotenv.config();

type CreateDbConnection = () => Promise<Connection>;

const getContext = async (
  req: express.Request,
  dbConnection: Connection,
): Promise<ApolloServerContext> => {
  const token = req?.headers['authorized'] as string;
  if (!token) return { dbConnection };

  try {
    const { JWT_SECRET } = process.env;
    const user = jwt.verify(token, JWT_SECRET!) as User;

    const repository = new UserRepository(dbConnection);
    const userEntity = await repository.getById(user.id);

    return { dbConnection, actor: userEntity };
  } catch (e) {
    console.error(e);
    return { dbConnection };
  }
};

export const createAndRunApolloServer = async (createDbConnection: CreateDbConnection) => {
  // Create DB connection
  const dbConnection = await createDbConnection();

  // Configure Express App
  const app = express();
  app.use(cors());

  // Create HTTP Server
  const httpServer = http.createServer(app);

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
  server.applyMiddleware({ app, path: '/graphql' });
  server.installSubscriptionHandlers(httpServer);

  // Run server
  const port = 3000;
  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
};
