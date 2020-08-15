import { QueryResolvers } from 'schema/types';
import { GetTodoInteractor } from 'domain-model/src/usecase/todo/GetTodo';

import { GetTodoPresenter } from '../../../../presenter/todo/GetTodo';
import { GetTodoController } from '../../../../controller/todo/GetTodo';
import { TodoRepository } from '../../../../repository/typeorm/Todo';

export const Query: QueryResolvers = {
  todo: async (_parent, args, ctx) => {
    const { dbConnection } = ctx;
    const repository = new TodoRepository(dbConnection);
    const presenter = new GetTodoPresenter();
    const usecase = new GetTodoInteractor(repository, presenter);
    const controller = new GetTodoController(usecase);

    await controller.handle(args.id);

    return presenter.getResponse();
  },
};
