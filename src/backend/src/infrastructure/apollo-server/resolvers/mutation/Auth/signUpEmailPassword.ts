import { MutationResolvers } from 'schema';
import { SignUpEmailPasswordInteractor } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlUserRepository } from '../../../../../repository/typeorm/user/repository/User';
import { GqlAuthEmailPasswordRepository } from '../../../../../repository/typeorm/auth/repository/AuthEmailPassword';
import { GqlSignUpEmailPasswordPresenter } from '../../../../../presenter/auth/SignUpEmailPassword';

export const signUpEmailPassword: MutationResolvers<ApolloServerContext> = {
  signUpEmailPassword: async (_parent, args, { dbConnection }) => {
    const userRepository = new GqlUserRepository(dbConnection);
    const authRepository = new GqlAuthEmailPasswordRepository(dbConnection);
    const presenter = new GqlSignUpEmailPasswordPresenter();
    const usecase = new SignUpEmailPasswordInteractor(authRepository, userRepository, presenter);

    await usecase.handle(args.input!);
    return presenter.getResponse();
  },
};
