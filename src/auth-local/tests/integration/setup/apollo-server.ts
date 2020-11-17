import dotenv from 'dotenv';
import path from 'path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import { createTestClient, ApolloServerTestClient } from 'apollo-server-testing';
import { Connection } from 'typeorm';

import { resolvers } from '../../../src/infrastructure/apollo-server/resolvers';

dotenv.config();

const getContext = async (dbConnection: Connection) => ({ dbConnection });

export const createApolloServerForTesting = async (
  dbConnection: Connection,
): Promise<ApolloServerTestClient> => {
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
    context: () => getContext(dbConnection),
  });

  // Create GraphQL Client for Testing
  const testClient = createTestClient(server);
  return testClient;
};
