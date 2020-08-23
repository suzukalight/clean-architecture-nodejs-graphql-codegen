import { MutationResolvers } from 'schema/types';
import { UndoneTodoInteractor } from 'domain-model/src/usecase/todo/UndoneTodo';
import { allowOnlyWhenActorHasMemberRole } from 'domain-model/src/policy/decision/common';

import { ApolloServerContext } from '../../../types';
import { TodoRepository } from '../../../../../repository/typeorm/Todo';
import { UndoneTodoPresenter } from '../../../../../presenter/todo/UndoneTodo';

export const undoneTodo: MutationResolvers<ApolloServerContext> = {
  undoneTodo: async (_parent, args, { dbConnection, actor }) => {
    allowOnlyWhenActorHasMemberRole(actor);

    const repository = new TodoRepository(dbConnection);
    const presenter = new UndoneTodoPresenter();
    const usecase = new UndoneTodoInteractor(repository, presenter);

    await usecase.handle(args.input!, actor);

    return presenter.getResponse()!;
  },
};
