import { MutationResolvers } from 'schema/types';
import { CreateUserInteractor } from 'domain-model/src/usecase/user/CreateUser';

import { CreateUserController } from '../../../../controller/user/CreateUser';
import { CreateUserPresenter } from '../../../../presenter/user/CreateUser';
import { UserRepository } from '../../../../repository/typeorm/User';

export const Mutation: MutationResolvers = {
  createUser: async (_parent, args, ctx) => {
    const { dbConnection } = ctx;
    const repository = new UserRepository(dbConnection);
    const presenter = new CreateUserPresenter();
    const usecase = new CreateUserInteractor(repository, presenter);
    const controller = new CreateUserController(usecase);

    await controller.handle(args.input!);

    return presenter.getResponse()!;
  },
};
