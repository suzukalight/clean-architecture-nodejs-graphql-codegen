import { MutationResolvers } from '../../../../../generated/resolver-types';
import { SignInEmailPasswordInteractor } from '../../../../../usecase/auth/SignInEmailPassword';
import { ApolloServerContext } from '../../../types';
import { GqlAuthEmailPasswordRepository } from '../../../../../repository/typeorm/auth/repository/AuthEmailPassword';
import { GqlSignInEmailPasswordPresenter } from '../../../../../presenter/auth/SignInEmailPassword';

export const signInEmailPassword: MutationResolvers<ApolloServerContext> = {
  signInEmailPassword: async (_parent, args, { dbConnection }) => {
    const authRepository = new GqlAuthEmailPasswordRepository(dbConnection);
    const presenter = new GqlSignInEmailPasswordPresenter();
    const usecase = new SignInEmailPasswordInteractor(authRepository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse();
  },
};
