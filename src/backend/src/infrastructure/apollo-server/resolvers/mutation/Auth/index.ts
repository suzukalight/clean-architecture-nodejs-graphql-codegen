import { MutationResolvers } from 'schema/types';

import { ApolloServerContext } from '../../type';
import { signInEmailPassword } from './signInEmailPassword';

export const Auth: MutationResolvers<ApolloServerContext> = {
  ...signInEmailPassword,
};
