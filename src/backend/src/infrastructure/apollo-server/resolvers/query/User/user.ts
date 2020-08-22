import { QueryResolvers } from 'schema/types';
import { GetUserInteractor } from 'domain-model/src/usecase/user/GetUser';

import { ApolloServerContext } from '../../type';
import { GetUserPresenter } from '../../../../../presenter/user/GetUser';
import { UserRepository } from '../../../../../repository/typeorm/User';

export const user: QueryResolvers<ApolloServerContext> = {
  user: async (_parent, args, { dbConnection }) => {
    const repository = new UserRepository(dbConnection);
    const presenter = new GetUserPresenter();
    const usecase = new GetUserInteractor(repository, presenter);

    await usecase.handle(args.id);

    return presenter.getResponse();
  },
};
