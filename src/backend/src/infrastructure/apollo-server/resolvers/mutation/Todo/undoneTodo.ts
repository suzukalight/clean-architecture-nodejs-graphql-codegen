import { MutationResolvers } from 'schema';
import { UndoneTodoInteractor, allowOnlyWhenActorHasMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { TodoRepository } from '../../../../../repository/typeorm/todo/repository/Todo';
import { UndoneTodoPresenter } from '../../../../../presenter/todo/UndoneTodo';

export const undoneTodo: MutationResolvers<ApolloServerContext> = {
  undoneTodo: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new TodoRepository(dbConnection);
    const presenter = new UndoneTodoPresenter();
    const usecase = new UndoneTodoInteractor(repository, presenter);

    await usecase.handle(args.input!, actor);

    return presenter.getResponse()!;
  },
};
