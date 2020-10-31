import { UserResolvers } from 'schema';

import { ApolloServerContext } from '../../types';
import { GqlTodoQueryService } from '../../../../repository/typeorm/todo/queryService/Todo';
import { allowOnlyWhenActorHasMemberRole, AllTodosByOwnerIdInteractor } from 'domain-model';
import { GqlAllTodosByOwnerIdPresenter } from '../../../../presenter/todo/AllTodosByOwnerId';
import { toGqlTodo } from '../../../../presenter/utils/converter/todo';

export const User: UserResolvers<ApolloServerContext> = {
  todos: async (parent, _args, { actor, dbConnection }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    if (parent?.todos?.length) return parent.todos;

    const queryService = new GqlTodoQueryService(dbConnection);
    const presenter = new GqlAllTodosByOwnerIdPresenter();
    const usecase = new AllTodosByOwnerIdInteractor(queryService, presenter);

    await usecase.handle({ ownerId: parent.id }, actor!);

    return presenter.getResponse()?.edges?.map((edge) => toGqlTodo(edge.todo)) ?? [];
  },
};
