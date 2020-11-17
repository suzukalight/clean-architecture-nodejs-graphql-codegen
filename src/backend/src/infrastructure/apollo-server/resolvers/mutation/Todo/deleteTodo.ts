import { MutationResolvers } from 'schema/lib/app/types';
import { DeleteTodoInteractor, allowOnlyWhenActorHasMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlTodoRepository } from '../../../../../repository/typeorm/todo/repository/Todo';
import { GqlDeleteTodoPresenter } from '../../../../../presenter/todo/DeleteTodo';

export const deleteTodo: MutationResolvers<ApolloServerContext> = {
  deleteTodo: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new GqlTodoRepository(dbConnection);
    const presenter = new GqlDeleteTodoPresenter();
    const usecase = new DeleteTodoInteractor(repository, presenter);

    await usecase.handle(args.input!, actor!);

    return presenter.getResponse();
  },
};
