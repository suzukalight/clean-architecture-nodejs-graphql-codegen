import { MutationResolvers } from 'auth-local-schema';

import { ApolloServerContext } from '../../../types';
import { signInEmailPassword } from './signInEmailPassword';
import { signUpEmailPassword } from './signUpEmailPassword';

export const Auth: MutationResolvers<ApolloServerContext> = {
  ...signInEmailPassword,
  ...signUpEmailPassword,
};
