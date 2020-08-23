import { Connection } from 'typeorm';
import { Maybe } from 'schema/types';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';

export interface ApolloServerContext {
  dbConnection: Connection;
  actor?: Maybe<UserEntity>;
}
