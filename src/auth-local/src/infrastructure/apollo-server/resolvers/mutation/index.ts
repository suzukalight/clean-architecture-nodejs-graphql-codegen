import { MutationResolvers } from 'auth-local-schema';

import { Auth } from './Auth';

export const Mutation: MutationResolvers = {
  ...Auth,
};
