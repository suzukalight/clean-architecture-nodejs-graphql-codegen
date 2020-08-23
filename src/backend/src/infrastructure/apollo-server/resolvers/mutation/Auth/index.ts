import { MutationResolvers } from 'schema/types';

import { ApolloServerContext } from '../../../types';
import { signInEmailPassword } from './signInEmailPassword';

export const Auth: MutationResolvers<ApolloServerContext> = {
  ...signInEmailPassword,
};
