import { MutationResolvers } from 'schema/types';
import { CreateTodoInteractor } from 'domain-model/src/usecase/todo/CreateTodo';

import { ApolloServerContext } from '../../../type';
import { TodoRepository } from '../../../../../repository/typeorm/Todo';
import { CreateTodoPresenter } from '../../../../../presenter/todo/CreateTodo';
import { UserRepository } from '../../../../../repository/typeorm/User';
import { allowWhenActorHasMemberRole } from '../../../authority/policy';

export const createTodo: MutationResolvers<ApolloServerContext> = {
  createTodo: async (_parent, args, { dbConnection, actor }) => {
    allowWhenActorHasMemberRole(actor);

    const userRepository = new UserRepository(dbConnection);
    const todoRepository = new TodoRepository(dbConnection);
    const presenter = new CreateTodoPresenter();
    const usecase = new CreateTodoInteractor(todoRepository, userRepository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse()!;
  },
};
