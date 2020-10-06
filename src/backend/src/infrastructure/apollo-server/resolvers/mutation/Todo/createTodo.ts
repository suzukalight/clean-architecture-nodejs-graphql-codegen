import { MutationResolvers } from 'schema';
import { CreateTodoInteractor, allowOnlyWhenActorHasMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { GqlTodoRepository } from '../../../../../repository/typeorm/todo/repository/Todo';
import { GqlCreateTodoPresenter } from '../../../../../presenter/todo/CreateTodo';
import { GqlUserRepository } from '../../../../../repository/typeorm/user/repository/User';

export const createTodo: MutationResolvers<ApolloServerContext> = {
  createTodo: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const userRepository = new GqlUserRepository(dbConnection);
    const todoRepository = new GqlTodoRepository(dbConnection);
    const presenter = new GqlCreateTodoPresenter();
    const usecase = new CreateTodoInteractor(todoRepository, userRepository, presenter);

    await usecase.handle(args.input!);

    return presenter.getResponse();
  },
};
