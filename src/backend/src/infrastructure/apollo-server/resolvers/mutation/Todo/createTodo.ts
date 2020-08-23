import { MutationResolvers } from 'schema/types';
import { CreateTodoInteractor } from 'domain-model/src/usecase/todo/CreateTodo';
import { allowOnlyWhenActorHasMemberRole } from 'domain-model/src/policy/decision/common';

import { ApolloServerContext } from '../../../types';
import { TodoRepository } from '../../../../../repository/typeorm/Todo';
import { CreateTodoPresenter } from '../../../../../presenter/todo/CreateTodo';
import { UserRepository } from '../../../../../repository/typeorm/User';

export const createTodo: MutationResolvers<ApolloServerContext> = {
  createTodo: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const userRepository = new UserRepository(dbConnection);
    const todoRepository = new TodoRepository(dbConnection);
    const presenter = new CreateTodoPresenter();
    const usecase = new CreateTodoInteractor(todoRepository, userRepository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse()!;
  },
};
