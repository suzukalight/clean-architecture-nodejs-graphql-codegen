import { MutationResolvers } from '../../../../generated/resolver-types';
import { Auth } from './Auth';

export const Mutation: MutationResolvers = {
  ...Auth,
};
