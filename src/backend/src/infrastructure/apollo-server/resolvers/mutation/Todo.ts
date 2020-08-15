import { MutationResolvers } from 'schema/types';
import { CreateTodoInteractor } from 'domain-model/src/usecase/todo/CreateTodo';
import { DoneTodoInteractor } from 'domain-model/src/usecase/todo/DoneTodo';
import { UndoneTodoInteractor } from 'domain-model/src/usecase/todo/UndoneTodo';
import { DeleteTodoInteractor } from 'domain-model/src/usecase/todo/DeleteTodo';

import { TodoRepository } from '../../../../repository/typeorm/Todo';
import { CreateTodoController } from '../../../../controller/todo/CreateTodo';
import { CreateTodoPresenter } from '../../../../presenter/todo/CreateTodo';
import { DoneTodoPresenter } from '../../../../presenter/todo/DoneTodo';
import { DoneTodoController } from '../../../../controller/todo/DoneTodo';
import { UndoneTodoPresenter } from '../../../../presenter/todo/UndoneTodo';
import { UndoneTodoController } from '../../../../controller/todo/UndoneTodo';
import { DeleteTodoPresenter } from '../../../../presenter/todo/DeleteTodo';
import { DeleteTodoController } from '../../../../controller/todo/DeleteTodo';

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

  doneTodo: async (_parent, args, ctx) => {
    const { dbConnection } = ctx;
    const repository = new TodoRepository(dbConnection);
    const presenter = new DoneTodoPresenter();
    const usecase = new DoneTodoInteractor(repository, presenter);
    const controller = new DoneTodoController(usecase);

    await controller.handle(args.input!);

    return presenter.getResponse()!;
  },

  undoneTodo: async (_parent, args, ctx) => {
    const { dbConnection } = ctx;
    const repository = new TodoRepository(dbConnection);
    const presenter = new UndoneTodoPresenter();
    const usecase = new UndoneTodoInteractor(repository, presenter);
    const controller = new UndoneTodoController(usecase);

    await controller.handle(args.input!);

    return presenter.getResponse()!;
  },

  deleteTodo: async (_parent, args, ctx) => {
    const { dbConnection } = ctx;
    const repository = new TodoRepository(dbConnection);
    const presenter = new DeleteTodoPresenter();
    const usecase = new DeleteTodoInteractor(repository, presenter);
    const controller = new DeleteTodoController(usecase);

    await controller.handle(args.input!);

    return presenter.getResponse()!;
  },
};
