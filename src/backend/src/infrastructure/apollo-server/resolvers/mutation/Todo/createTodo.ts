import { MutationResolvers } from 'schema';
import { CreateTodoInteractor, allowOnlyWhenActorHasMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { TodoRepository } from '../../../../../repository/typeorm/todo/repository/Todo';
import { CreateTodoPresenter } from '../../../../../presenter/todo/CreateTodo';
import { UserRepository } from '../../../../../repository/typeorm/user/repository/User';

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
