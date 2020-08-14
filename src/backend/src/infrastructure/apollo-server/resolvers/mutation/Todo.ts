import { MutationResolvers } from 'schema/types';

import { TodoRepository } from '../../../../repository/typeorm/Todo';
import { CreateTodoController } from '../../../../controller/todo/CreateTodo';
import { CreateTodoInteractor } from '../../../../usecase/todo/CreateTodo';
import { CreateTodoPresenter } from '../../../../presenter/todo/CreateTodo';
import { DoneTodoPresenter } from '../../../../presenter/todo/DoneTodo';
import { DoneTodoInteractor } from '../../../../usecase/todo/DoneTodo';
import { DoneTodoController } from '../../../../controller/todo/DoneTodo';
import { UndoneTodoPresenter } from '../../../../presenter/todo/UndoneTodo';
import { UndoneTodoInteractor } from '../../../../usecase/todo/UndoneTodo';
import { UndoneTodoController } from '../../../../controller/todo/UndoneTodo';

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
};
