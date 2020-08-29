import { MutationResolvers } from 'schema';
import { DoneTodoInteractor, allowOnlyWhenActorHasMemberRole } from 'domain-model';

import { ApolloServerContext } from '../../../types';
import { TodoRepository } from '../../../../../repository/typeorm/todo/repository/Todo';
import { DoneTodoPresenter } from '../../../../../presenter/todo/DoneTodo';

export const doneTodo: MutationResolvers<ApolloServerContext> = {
  doneTodo: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new TodoRepository(dbConnection);
    const presenter = new DoneTodoPresenter();
    const usecase = new DoneTodoInteractor(repository, presenter);

    await usecase.handle(args.input!, actor);

    return presenter.getResponse()!;
  },
};
