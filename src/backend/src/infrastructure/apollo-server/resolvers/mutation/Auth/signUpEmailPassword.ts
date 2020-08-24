import { MutationResolvers } from 'schema/types';
import { SignUpEmailPasswordInteractor } from 'domain-model/src/usecase/auth/SignUpEmailPassword';

import { ApolloServerContext } from '../../../types';
import { UserRepository } from '../../../../../repository/typeorm/User';
import { AuthEmailPasswordRepository } from '../../../../../repository/typeorm/auth/AuthEmailPassword';
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
