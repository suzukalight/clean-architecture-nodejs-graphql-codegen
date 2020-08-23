import { MutationResolvers } from 'schema/types';
import { DeleteTodoInteractor } from 'domain-model/src/usecase/todo/DeleteTodo';

import { ApolloServerContext } from '../../../type';
import { TodoRepository } from '../../../../../repository/typeorm/Todo';
import { DeleteTodoPresenter } from '../../../../../presenter/todo/DeleteTodo';
import { allowWhenActorHasMemberRole } from '../../../authority/policy';

export const deleteTodo: MutationResolvers<ApolloServerContext> = {
  deleteTodo: async (_parent, args, { dbConnection, actor }) => {
    allowWhenActorHasMemberRole(actor);

    const repository = new TodoRepository(dbConnection);
    const presenter = new DeleteTodoPresenter();
    const usecase = new DeleteTodoInteractor(repository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse()!;
  },
};
