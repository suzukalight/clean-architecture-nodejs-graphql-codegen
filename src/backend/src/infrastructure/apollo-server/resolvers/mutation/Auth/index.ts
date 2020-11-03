import { MutationResolvers } from 'schema';

import { ApolloServerContext } from '../../../types';
import { signInEmailPassword } from './signInEmailPassword';
import { signUpEmailPassword } from './signUpEmailPassword';
import { signInOrSignUpAuth0 } from './signInOrSignUpAuth0';

export const Auth: MutationResolvers<ApolloServerContext> = {
  ...signInEmailPassword,
  ...signUpEmailPassword,
  ...signInOrSignUpAuth0,
};
