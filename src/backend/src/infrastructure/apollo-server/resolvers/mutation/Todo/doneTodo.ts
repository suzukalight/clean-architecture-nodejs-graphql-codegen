import { MutationResolvers } from 'schema/types';
import { DoneTodoInteractor } from 'domain-model/src/usecase/todo/DoneTodo';

import { ApolloServerContext } from '../../../types';
import { TodoRepository } from '../../../../../repository/typeorm/Todo';
import { DoneTodoPresenter } from '../../../../../presenter/todo/DoneTodo';
import { allowWhenActorHasMemberRole } from '../../../authority/policy';

export const doneTodo: MutationResolvers<ApolloServerContext> = {
  doneTodo: async (_parent, args, { dbConnection, actor }) => {
    allowWhenActorHasMemberRole(actor);

    const repository = new TodoRepository(dbConnection);
    const presenter = new DoneTodoPresenter();
    const usecase = new DoneTodoInteractor(repository, presenter);

    await usecase.handle(args.input!, actor);

    return presenter.getResponse()!;
  },
};
