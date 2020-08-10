import { MutationResolvers } from 'schema/types';

import { CreateUserController } from '../../../../controller/user/CreateUser';
import { CreateUserInteractor } from '../../../../usecase/user/CreateUser';
import { CreateUserPresenter } from '../../../../presenter/user/CreateUser';
import { InMemoryUserRepository } from '../../../../repository/memory/user';

export const Mutation: MutationResolvers = {
  createUser: async (_parent, args, _context) => {
    const createUserPresenter = new CreateUserPresenter();
    const controller = new CreateUserController(
      new CreateUserInteractor(new InMemoryUserRepository(), createUserPresenter),
    );
    await controller.handle(args.input!);
    return createUserPresenter.getResponse()!;
  },
};
