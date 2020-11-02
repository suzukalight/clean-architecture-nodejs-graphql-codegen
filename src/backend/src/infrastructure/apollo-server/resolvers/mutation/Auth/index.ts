import { MutationResolvers } from 'schema';

import { ApolloServerContext } from '../../../types';
import { signInEmailPassword } from './signInEmailPassword';
import { signUpEmailPassword } from './signUpEmailPassword';
import { signInAuth0 } from './signInAuth0';
import { signUpAuth0 } from './signUpAuth0';

export const Auth: MutationResolvers<ApolloServerContext> = {
  ...signInEmailPassword,
  ...signUpEmailPassword,
  ...signInAuth0,
  ...signUpAuth0,
};
