import { MutationResolvers } from 'schema/types';
import { CreateUserInteractor } from 'domain-model/src/usecase/user/CreateUser';
import { UpdateUserRolesInteractor } from 'domain-model/src/usecase/user/UpdateUserRoles';

import { UserRepository } from '../../../../repository/typeorm/User';
import { CreateUserController } from '../../../../controller/user/CreateUser';
import { CreateUserPresenter } from '../../../../presenter/user/CreateUser';
import { UpdateUserRolesPresenter } from '../../../../presenter/user/UpdateUserRoles';
import { UpdateUserRolesController } from '../../../../controller/user/UpdateUserRoles';

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

  updateUserRoles: async (_parent, args, ctx) => {
    const { dbConnection } = ctx;
    const repository = new UserRepository(dbConnection);
    const presenter = new UpdateUserRolesPresenter();
    const usecase = new UpdateUserRolesInteractor(repository, presenter);
    const controller = new UpdateUserRolesController(usecase);

    await controller.handle(args.input!);

    return presenter.getResponse()!;
  },
};
