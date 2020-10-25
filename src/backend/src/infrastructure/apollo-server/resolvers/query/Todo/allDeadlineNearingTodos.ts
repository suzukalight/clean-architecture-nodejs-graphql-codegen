import { QueryResolvers } from 'schema';
import {
  DeadlineNearingTodosInteractor,
  allowOnlyWhenActorHasMemberRole,
  denyIfNotSet,
} from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlDeadlineNearingTodosPresenter } from '../../../../../presenter/todo/DeadlineNearingTodos';
import { GqlTodoQueryService } from '../../../../../repository/typeorm/todo/queryService/Todo';

export const allDeadlineNearingTodos: QueryResolvers<ApolloServerContext> = {
  allDeadlineNearingTodos: async (_parent, args, { dbConnection, actor }) => {
    denyIfNotSet(args?.query, ['dueDate']);
    denyIfNotSet(actor, ['id']);
    allowOnlyWhenActorHasMemberRole(actor);

    const queryService = new GqlTodoQueryService(dbConnection);
    const presenter = new GqlDeadlineNearingTodosPresenter();
    const usecase = new DeadlineNearingTodosInteractor(queryService, presenter);

    await usecase.handle(args.query!, actor!);

    return presenter.getResponse();
  },
};
