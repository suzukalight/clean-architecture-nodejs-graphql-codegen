import { QueryResolvers } from 'schema/lib/app/types';
import { GetUserByIdInteractor, allowOnlyWhenActorHasMemberRole, denyIfNotSet } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlUserQueryService } from '../../../../../repository/typeorm/user/queryService/User';
import { GqlGetUserByIdPresenter } from '../../../../../presenter/user/GetUserById';

export const user: QueryResolvers<ApolloServerContext> = {
  user: async (_parent, args, { dbConnection, actor }) => {
    denyIfNotSet(args, ['id']);
    allowOnlyWhenActorHasMemberRole(actor);

    const queryService = new GqlUserQueryService(dbConnection);
    const presenter = new GqlGetUserByIdPresenter();
    const usecase = new GetUserByIdInteractor(queryService, presenter);

    await usecase.handle({ id: args?.id }, actor!);

    return presenter.getResponse();
  },
};
