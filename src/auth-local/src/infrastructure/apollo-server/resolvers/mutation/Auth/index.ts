import { MutationResolvers } from '../../../../../generated/resolver-types';
import { ApolloServerContext } from '../../../types';
import { signInEmailPassword } from './signInEmailPassword';
import { signUpEmailPassword } from './signUpEmailPassword';

export const Auth: MutationResolvers<ApolloServerContext> = {
  ...signInEmailPassword,
  ...signUpEmailPassword,
};
