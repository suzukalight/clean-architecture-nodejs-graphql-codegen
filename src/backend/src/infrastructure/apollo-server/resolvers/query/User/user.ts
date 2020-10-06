import { QueryResolvers } from 'schema';
import { GetUserInteractor, allowOnlyWhenActorHasMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlGetUserPresenter } from '../../../../../presenter/user/GetUser';
import { GqlUserRepository } from '../../../../../repository/typeorm/user/repository/User';

export const user: QueryResolvers<ApolloServerContext> = {
  user: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new GqlUserRepository(dbConnection);
    const presenter = new GqlGetUserPresenter();
    const usecase = new GetUserInteractor(repository, presenter);

    await usecase.handle({ id: args.id });

    return presenter.getResponse();
  },
};
