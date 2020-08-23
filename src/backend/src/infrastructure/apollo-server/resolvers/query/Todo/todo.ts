import { QueryResolvers } from 'schema/types';
import { GetTodoInteractor } from 'domain-model/src/usecase/todo/GetTodo';

import { ApolloServerContext } from '../../../type';
import { GetTodoPresenter } from '../../../../../presenter/todo/GetTodo';
import { TodoRepository } from '../../../../../repository/typeorm/Todo';
import { allowWhenActorHasMemberRole } from '../../../authority/policy';

export const todo: QueryResolvers<ApolloServerContext> = {
  todo: async (_parent, args, { dbConnection, actor }) => {
    allowWhenActorHasMemberRole(actor);

    const repository = new TodoRepository(dbConnection);
    const presenter = new GetTodoPresenter();
    const usecase = new GetTodoInteractor(repository, presenter);

    await usecase.handle(args.id);

    return presenter.getResponse();
  },
};
