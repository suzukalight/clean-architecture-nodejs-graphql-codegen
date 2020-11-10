import { MutationResolvers } from 'schema';

import { Auth } from './Auth';

export const Mutation: MutationResolvers = {
  ...Auth,
};
