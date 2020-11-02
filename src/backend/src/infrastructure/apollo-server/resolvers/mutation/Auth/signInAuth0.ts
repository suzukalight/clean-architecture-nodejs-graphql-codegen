import { MutationResolvers } from 'schema';
import { SignInAuth0Interactor } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlUserRepository } from '../../../../../repository/typeorm/user/repository/User';
import { GqlAuthAuth0Repository } from '../../../../../repository/typeorm/auth/repository/AuthAuth0';
import { GqlSignInAuth0Presenter } from '../../../../../presenter/auth/SignInAuth0';

export const signInAuth0: MutationResolvers<ApolloServerContext> = {
  signInAuth0: async (_parent, args, { dbConnection }) => {
    const userRepository = new GqlUserRepository(dbConnection);
    const authRepository = new GqlAuthAuth0Repository(dbConnection);
    const presenter = new GqlSignInAuth0Presenter();
    const usecase = new SignInAuth0Interactor(authRepository, userRepository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse();
  },
};
