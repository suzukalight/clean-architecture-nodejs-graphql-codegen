import { MutationResolvers } from 'schema/types';
import { SignInEmailPasswordInteractor } from 'domain-model/src/usecase/auth/SignInEmailPassword';

import { ApolloServerContext } from '../../../types';
import { UserRepository } from '../../../../../repository/typeorm/user/repository/User';
import { AuthEmailPasswordRepository } from '../../../../../repository/typeorm/auth/repository/AuthEmailPassword';
import { SignInEmailPasswordPresenter } from '../../../../../presenter/auth/SignInEmailPassword';

export const signInEmailPassword: MutationResolvers<ApolloServerContext> = {
  signInEmailPassword: async (_parent, args, { dbConnection }) => {
    const userRepository = new UserRepository(dbConnection);
    const authRepository = new AuthEmailPasswordRepository(dbConnection);
    const presenter = new SignInEmailPasswordPresenter();
    const usecase = new SignInEmailPasswordInteractor(authRepository, userRepository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse();
  },
};
