import { MutationResolvers } from 'schema';
import { SignUpEmailPasswordInteractor } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { UserRepository } from '../../../../../repository/typeorm/user/repository/User';
import { AuthEmailPasswordRepository } from '../../../../../repository/typeorm/auth/repository/AuthEmailPassword';
import { SignUpEmailPasswordPresenter } from '../../../../../presenter/auth/SignUpEmailPassword';

export const signUpEmailPassword: MutationResolvers<ApolloServerContext> = {
  signUpEmailPassword: async (_parent, args, { dbConnection }) => {
    const userRepository = new UserRepository(dbConnection);
    const authRepository = new AuthEmailPasswordRepository(dbConnection);
    const presenter = new SignUpEmailPasswordPresenter();
    const usecase = new SignUpEmailPasswordInteractor(authRepository, userRepository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse();
  },
};
