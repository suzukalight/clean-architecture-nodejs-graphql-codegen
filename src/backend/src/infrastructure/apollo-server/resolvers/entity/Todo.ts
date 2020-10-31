import { TodoResolvers } from 'schema';

import { ApolloServerContext } from '../../types';
import { GqlUserQueryService } from '../../../../repository/typeorm/user/queryService/User';
import { allowOnlyWhenActorHasMemberRole, GetUserByIdInteractor } from 'domain-model';
import { GqlGetUserByIdPresenter } from '../../../../presenter/user/GetUserById';

export const Todo: TodoResolvers<ApolloServerContext> = {
  owner: async (parent, _args, { actor, dbConnection }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    if (parent?.owner?.id) return parent.owner;

    const queryService = new GqlUserQueryService(dbConnection);
    const presenter = new GqlGetUserByIdPresenter();
    const usecase = new GetUserByIdInteractor(queryService, presenter);

    await usecase.handle({ id: parent?.ownerId }, actor!);

    return presenter.getResponse();
  },
};
