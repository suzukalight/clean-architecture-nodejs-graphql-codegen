import { QueryResolvers } from 'schema/types';

export const Query: QueryResolvers = {
  user: async (_parent, args) => ({ id: args.id, email: 'aaa@ddd.com' }),
};
