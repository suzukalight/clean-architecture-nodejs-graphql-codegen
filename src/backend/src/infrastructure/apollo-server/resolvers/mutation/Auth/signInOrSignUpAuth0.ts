import { MutationResolvers } from 'schema';
import { SignInOrSignUpAuth0Interactor } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlUserRepository } from '../../../../../repository/typeorm/user/repository/User';
import { GqlAuthAuth0Repository } from '../../../../../repository/typeorm/auth/repository/AuthAuth0';
import { GqlSignInOrSignUpAuth0Presenter } from '../../../../../presenter/auth/SignInOrSignUpAuth0';

export const signInOrSignUpAuth0: MutationResolvers<ApolloServerContext> = {
  signInOrSignUpAuth0: async (_parent, args, { dbConnection }) => {
    const userRepository = new GqlUserRepository(dbConnection);
    const authRepository = new GqlAuthAuth0Repository(dbConnection);
    const presenter = new GqlSignInOrSignUpAuth0Presenter();
    const usecase = new SignInOrSignUpAuth0Interactor(authRepository, userRepository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse();
  },
};
