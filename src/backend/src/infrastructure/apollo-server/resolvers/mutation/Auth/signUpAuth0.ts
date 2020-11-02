import { MutationResolvers } from 'schema';
import { SignUpAuth0Interactor } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlUserRepository } from '../../../../../repository/typeorm/user/repository/User';
import { GqlAuthAuth0Repository } from '../../../../../repository/typeorm/auth/repository/AuthAuth0';
import { GqlSignUpAuth0Presenter } from '../../../../../presenter/auth/SignUpAuth0';

export const signUpAuth0: MutationResolvers<ApolloServerContext> = {
  signUpAuth0: async (_parent, args, { dbConnection }) => {
    const userRepository = new GqlUserRepository(dbConnection);
    const authRepository = new GqlAuthAuth0Repository(dbConnection);
    const presenter = new GqlSignUpAuth0Presenter();
    const usecase = new SignUpAuth0Interactor(authRepository, userRepository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse();
  },
};
