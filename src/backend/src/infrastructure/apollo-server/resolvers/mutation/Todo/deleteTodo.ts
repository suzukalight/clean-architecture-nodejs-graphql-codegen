import { MutationResolvers } from 'schema';
import { DeleteTodoInteractor, allowOnlyWhenActorHasMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { TodoRepository } from '../../../../../repository/typeorm/todo/repository/Todo';
import { DeleteTodoPresenter } from '../../../../../presenter/todo/DeleteTodo';

export const deleteTodo: MutationResolvers<ApolloServerContext> = {
  deleteTodo: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new TodoRepository(dbConnection);
    const presenter = new DeleteTodoPresenter();
    const usecase = new DeleteTodoInteractor(repository, presenter);

    await usecase.handle(args.input!, actor);

    return presenter.getResponse()!;
  },
};
