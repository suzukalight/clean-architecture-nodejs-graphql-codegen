import { NotFoundError } from 'common';

import { TodoRepository } from './interface/repository';
import { UndoneTodoInputData, UndoneTodoUseCase } from './interface/usecase';
import { UndoneTodoOutputData, UndoneTodoPresenter } from './interface/presenter';
import { UserEntity } from '../../entity/user/UserEntity';
import { allowOnlyWhenActorIsOwner } from '../../policy/decision/common';

export class UndoneTodoInteractor implements UndoneTodoUseCase {
  private repository: TodoRepository;
  private presenter: UndoneTodoPresenter;

  constructor(repository: TodoRepository, presenter: UndoneTodoPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: UndoneTodoInputData, actor: UserEntity) {
    const todoEntity = await this.repository.getById(request.id);
    if (!todoEntity) throw new NotFoundError();

    allowOnlyWhenActorIsOwner(todoEntity.getOwnerId(), actor);

    todoEntity.undone();

    await this.repository.update(todoEntity);

    const outputData: UndoneTodoOutputData = { todo: todoEntity.toDto() };
    this.presenter.output(outputData);
  }
}
