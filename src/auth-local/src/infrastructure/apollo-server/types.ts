import { Connection } from 'typeorm';

export interface ApolloServerContext {
  dbConnection: Connection;
}
