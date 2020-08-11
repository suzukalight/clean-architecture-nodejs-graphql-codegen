import { QueryResolvers } from 'schema/types';

import { GetUserPresenter } from '../../../../presenter/user/GetUser';
import { GetUserController } from '../../../../controller/user/GetUser';
import { GetUserInteractor } from '../../../../usecase/user/GetUser';
import { UserRepository } from '../../../../repository/sequelize/User';
import { sequelize } from '../../../sequelize/sequelize';

export const Query: QueryResolvers = {
  user: async (_parent, args) => {
    const repository = new UserRepository(sequelize);
    const presenter = new GetUserPresenter();
    const usecase = new GetUserInteractor(repository, presenter);
    const controller = new GetUserController(usecase);

    await controller.handle(args.id);

    return presenter.getResponse();
  },
};
