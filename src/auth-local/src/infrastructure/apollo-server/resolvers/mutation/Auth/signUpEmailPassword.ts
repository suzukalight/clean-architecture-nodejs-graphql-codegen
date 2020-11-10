import { MutationResolvers } from 'schema';
import { SignUpEmailPasswordInteractor } from '../../../../../usecase/auth/SignUpEmailPassword';

import { ApolloServerContext } from '../../../types';
import { GqlAuthEmailPasswordRepository } from '../../../../../repository/typeorm/auth/repository/AuthEmailPassword';
import { GqlSignUpEmailPasswordPresenter } from '../../../../../presenter/auth/SignUpEmailPassword';

export const signUpEmailPassword: MutationResolvers<ApolloServerContext> = {
  signUpEmailPassword: async (_parent, args, { dbConnection }) => {
    const authRepository = new GqlAuthEmailPasswordRepository(dbConnection);
    const presenter = new GqlSignUpEmailPasswordPresenter();
    const usecase = new SignUpEmailPasswordInteractor(authRepository, presenter);

    await usecase.handle(args.input!);
    return presenter.getResponse();
  },
};
