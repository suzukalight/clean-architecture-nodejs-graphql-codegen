import { QueryResolvers } from 'schema/types';
import { GetUserInteractor } from 'domain-model/src/usecase/user/GetUser';
import { allowOnlyWhenActorHasMemberRole } from 'domain-model/src/policy/decision/common';

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
