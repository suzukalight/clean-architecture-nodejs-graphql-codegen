import { NotFoundError } from 'common';

import { TodoRepository } from './interface/repository';
import { DoneTodoInputData, DoneTodoUseCase } from './interface/usecase';
import { DoneTodoOutputData, DoneTodoPresenter } from './interface/presenter';
import { UserEntity } from '../../entity/user/UserEntity';
import { allowOnlyWhenActorIsOwner } from '../../policy/decision/common';

export class DoneTodoInteractor implements DoneTodoUseCase {
  private repository: TodoRepository;
  private presenter: DoneTodoPresenter;

  constructor(repository: TodoRepository, presenter: DoneTodoPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: DoneTodoInputData, actor: UserEntity) {
    const todoEntity = await this.repository.getById(request.id);
    if (!todoEntity) throw new NotFoundError();

    allowOnlyWhenActorIsOwner(todoEntity.getOwnerId(), actor);

    todoEntity.done();

    await this.repository.update(todoEntity);

    const outputData: DoneTodoOutputData = { todo: todoEntity.toDto() };
    this.presenter.output(outputData);
  }
}
