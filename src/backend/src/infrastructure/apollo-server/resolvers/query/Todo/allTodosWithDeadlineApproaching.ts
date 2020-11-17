import { QueryResolvers } from 'schema/lib/app/types';
import {
  AllTodosWithDeadlineApproachingInteractor,
  allowOnlyWhenActorHasMemberRole,
  denyIfNotSet,
} from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlAllTodosWithDeadlineApproachingPresenter } from '../../../../../presenter/todo/AllTodosWithDeadlineApproaching';
import { GqlTodoQueryService } from '../../../../../repository/typeorm/todo/queryService/Todo';

export const allTodosWithDeadlineApproaching: QueryResolvers<ApolloServerContext> = {
  allTodosWithDeadlineApproaching: async (_parent, args, { dbConnection, actor }) => {
    denyIfNotSet(args?.query, ['dueDate']);
    denyIfNotSet(actor, ['id']);
    allowOnlyWhenActorHasMemberRole(actor);

    const queryService = new GqlTodoQueryService(dbConnection);
    const presenter = new GqlAllTodosWithDeadlineApproachingPresenter();
    const usecase = new AllTodosWithDeadlineApproachingInteractor(queryService, presenter);

    await usecase.handle(args.query!, actor!);

    return presenter.getResponse();
  },
};
