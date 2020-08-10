import { DateTimeResolver } from 'graphql-scalars';
import { Resolvers } from 'schema/types';

import { Query } from './query';
import { Mutation } from './mutation';

export const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Query,
  Mutation,
};
