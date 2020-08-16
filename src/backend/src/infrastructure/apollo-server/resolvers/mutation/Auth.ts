import { MutationResolvers } from 'schema/types';
import { SignInEmailPasswordInteractor } from 'domain-model/src/usecase/auth/SignInEmailPassword';

import { UserRepository } from '../../../../repository/typeorm/User';
import { AuthEmailPasswordRepository } from '../../../../repository/typeorm/auth/AuthEmailPassword';
import { SignInEmailPasswordController } from '../../../../controller/auth/SignInEmailPassword';
import { SignInEmailPasswordPresenter } from '../../../../presenter/auth/SignInEmailPassword';

export const Mutation: MutationResolvers = {
  signInEmailPassword: async (_parent, args, ctx) => {
    const { dbConnection } = ctx;
    const userRepository = new UserRepository(dbConnection);
    const authRepository = new AuthEmailPasswordRepository(dbConnection);
    const presenter = new SignInEmailPasswordPresenter();
    const usecase = new SignInEmailPasswordInteractor(authRepository, userRepository, presenter);
    const controller = new SignInEmailPasswordController(usecase);

    await controller.handle(args.input!);

    return presenter.getResponse()!;
  },
};
