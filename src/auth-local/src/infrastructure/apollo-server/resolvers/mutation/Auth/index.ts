import { MutationResolvers } from 'schema';

import { ApolloServerContext } from '../../../types';
import { signInEmailPassword } from './signInEmailPassword';
import { signUpEmailPassword } from './signUpEmailPassword';

export const Auth: MutationResolvers<ApolloServerContext> = {
  ...signInEmailPassword,
  ...signUpEmailPassword,
};
