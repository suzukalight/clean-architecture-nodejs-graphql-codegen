import { QueryResolvers } from 'schema';
import { GetTodoInteractor, allowOnlyWhenActorHasMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlGetTodoPresenter } from '../../../../../presenter/todo/GetTodo';
import { GqlTodoRepository } from '../../../../../repository/typeorm/todo/repository/Todo';

export const todo: QueryResolvers<ApolloServerContext> = {
  todo: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new GqlTodoRepository(dbConnection);
    const presenter = new GqlGetTodoPresenter();
    const usecase = new GetTodoInteractor(repository, presenter);

    await usecase.handle({ id: args.id });

    return presenter.getResponse();
  },
};
