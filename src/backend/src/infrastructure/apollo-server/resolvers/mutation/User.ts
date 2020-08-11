import { MutationResolvers } from 'schema/types';

import { CreateUserController } from '../../../../controller/user/CreateUser';
import { CreateUserInteractor } from '../../../../usecase/user/CreateUser';
import { CreateUserPresenter } from '../../../../presenter/user/CreateUser';
import { UserRepository } from '../../../../repository/sequelize/User';
import { sequelize } from '../../../sequelize/sequelize';

export const Mutation: MutationResolvers = {
  createUser: async (_parent, args) => {
    const repository = new UserRepository(sequelize);
    const presenter = new CreateUserPresenter();
    const usecase = new CreateUserInteractor(repository, presenter);
    const controller = new CreateUserController(usecase);

    await controller.handle(args.input!);

    return presenter.getResponse()!;
  },
};
