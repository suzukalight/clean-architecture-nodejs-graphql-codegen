import { QueryResolvers } from 'schema/types';
import { GetUserInteractor } from 'domain-model/src/usecase/user/GetUser';

import { GetUserPresenter } from '../../../../presenter/user/GetUser';
import { GetUserController } from '../../../../controller/user/GetUser';
import { UserRepository } from '../../../../repository/typeorm/User';

export const Query: QueryResolvers = {
  user: async (_parent, args, ctx) => {
    const { dbConnection } = ctx;
    const repository = new UserRepository(dbConnection);
    const presenter = new GetUserPresenter();
    const usecase = new GetUserInteractor(repository, presenter);
    const controller = new GetUserController(usecase);

    await controller.handle(args.id);

    return presenter.getResponse();
  },
};
