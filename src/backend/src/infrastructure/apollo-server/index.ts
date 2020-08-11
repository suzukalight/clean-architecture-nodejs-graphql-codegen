import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import dotenv from 'dotenv';
import http from 'http';
import path from 'path';

import { resolvers } from './resolvers';

dotenv.config();

//
// create graphql schema
//
const schema = loadSchemaSync(path.join(__dirname, '../../../../schema/schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});
const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

//
// create express server
//
const app = express();
app.use(cors());

//
// apply graphql server to express
//
const server = new ApolloServer({
  schema: schemaWithResolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

//
// run server
//
const port = 3000;
httpServer.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});
