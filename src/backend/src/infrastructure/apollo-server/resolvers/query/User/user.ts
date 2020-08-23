import { QueryResolvers } from 'schema/types';
import { GetUserInteractor } from 'domain-model/src/usecase/user/GetUser';

import { ApolloServerContext } from '../../../types';
import { GetUserPresenter } from '../../../../../presenter/user/GetUser';
import { UserRepository } from '../../../../../repository/typeorm/User';
import { allowWhenActorHasMemberRole } from '../../../authority/policy';

export const user: QueryResolvers<ApolloServerContext> = {
  user: async (_parent, args, { dbConnection, actor }) => {
    allowWhenActorHasMemberRole(actor);

    const repository = new UserRepository(dbConnection);
    const presenter = new GetUserPresenter();
    const usecase = new GetUserInteractor(repository, presenter);

    await usecase.handle(args.id);

    return presenter.getResponse();
  },
};
