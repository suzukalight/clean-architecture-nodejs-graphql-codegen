import { Connection } from 'typeorm';
import { Maybe } from 'schema';
import { UserEntity } from 'domain-model';

export interface ApolloServerContext {
  dbConnection: Connection;
  actor: Maybe<UserEntity>;
}
