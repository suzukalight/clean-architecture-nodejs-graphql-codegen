import { QueryResolvers } from 'schema/types';
import { GetUserPresenter } from '../../../../presenter/user/GetUser';
import { GetUserController } from '../../../../controller/user/GetUser';
import { GetUserInteractor } from '../../../../usecase/user/GetUser';
import { InMemoryUserRepository } from '../../../../repository/memory/user';

export const Query: QueryResolvers = {
  user: async (_parent, args) => {
    const getUserPresenter = new GetUserPresenter();
    const controller = new GetUserController(
      new GetUserInteractor(new InMemoryUserRepository(), getUserPresenter),
    );
    await controller.handle(args.id);
    return getUserPresenter.getResponse();
  },
};
