import { UndoneTodoRequest } from 'schema/types';
import { NotFoundError } from 'common/error/NotFound';

import { TodoRepository } from './interface/repository';
import { UndoneTodoUseCase } from './interface/usecase';
import { UndoneTodoPresenter } from './interface/presenter';

export class UndoneTodoInteractor implements UndoneTodoUseCase {
  private repository: TodoRepository;
  private presenter: UndoneTodoPresenter;

  constructor(repository: TodoRepository, presenter: UndoneTodoPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: UndoneTodoRequest) {
    const todoEntity = await this.repository.getById(request.id);
    if (!todoEntity) throw new NotFoundError();

    todoEntity.undone();

    await this.repository.update(todoEntity);

    this.presenter.output(todoEntity);
  }
}
