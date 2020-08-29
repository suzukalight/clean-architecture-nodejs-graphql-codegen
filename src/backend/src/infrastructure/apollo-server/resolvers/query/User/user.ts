import { QueryResolvers } from 'schema';
import { GetUserInteractor, allowOnlyWhenActorHasMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GetUserPresenter } from '../../../../../presenter/user/GetUser';
import { UserRepository } from '../../../../../repository/typeorm/user/repository/User';

export const user: QueryResolvers<ApolloServerContext> = {
  user: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new UserRepository(dbConnection);
    const presenter = new GetUserPresenter();
    const usecase = new GetUserInteractor(repository, presenter);

    await usecase.handle(args.id);

    return presenter.getResponse();
  },
};
