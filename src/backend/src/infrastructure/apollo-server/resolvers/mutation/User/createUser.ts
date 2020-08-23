import { MutationResolvers } from 'schema/types';
import { CreateUserInteractor } from 'domain-model/src/usecase/user/CreateUser';

import { ApolloServerContext } from '../../../type';
import { UserRepository } from '../../../../../repository/typeorm/User';
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
