import { MutationResolvers } from 'schema';
import { SignInEmailPasswordInteractor } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlUserRepository } from '../../../../../repository/typeorm/user/repository/User';
import { GqlAuthEmailPasswordRepository } from '../../../../../repository/typeorm/auth/repository/AuthEmailPassword';
import { GqlSignInEmailPasswordPresenter } from '../../../../../presenter/auth/SignInEmailPassword';

export const signInEmailPassword: MutationResolvers<ApolloServerContext> = {
  signInEmailPassword: async (_parent, args, { dbConnection }) => {
    const userRepository = new GqlUserRepository(dbConnection);
    const authRepository = new GqlAuthEmailPasswordRepository(dbConnection);
    const presenter = new GqlSignInEmailPasswordPresenter();
    const usecase = new SignInEmailPasswordInteractor(authRepository, userRepository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse();
  },
};
