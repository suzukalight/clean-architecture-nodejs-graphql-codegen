import { MutationResolvers } from 'schema/types';

import { CreateTodoController } from '../../../../controller/todo/CreateTodo';
import { CreateTodoInteractor } from '../../../../usecase/todo/CreateTodo';
import { CreateTodoPresenter } from '../../../../presenter/todo/CreateTodo';
import { TodoRepository } from '../../../../repository/typeorm/Todo';

export const Mutation: MutationResolvers = {
  createTodo: async (_parent, args, ctx) => {
    const { dbConnection } = ctx;
    const repository = new TodoRepository(dbConnection);
    const presenter = new CreateTodoPresenter();
    const usecase = new CreateTodoInteractor(repository, presenter);
    const controller = new CreateTodoController(usecase);

    await controller.handle(args.input!);

    return presenter.getResponse()!;
  },
};
