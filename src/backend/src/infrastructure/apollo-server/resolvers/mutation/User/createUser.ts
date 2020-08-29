import { MutationResolvers } from 'schema';
import { CreateUserInteractor } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { UserRepository } from '../../../../../repository/typeorm/user/repository/User';
import { CreateUserPresenter } from '../../../../../presenter/user/CreateUser';

export const createUser: MutationResolvers<ApolloServerContext> = {
  createUser: async (_parent, args, { dbConnection }) => {
    const repository = new UserRepository(dbConnection);
    const presenter = new CreateUserPresenter();
    const usecase = new CreateUserInteractor(repository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse()!;
  },
};
