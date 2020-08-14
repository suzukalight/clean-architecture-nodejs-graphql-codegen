import { UndoneTodoRequest, TodoStatus } from 'schema/types';
import { NotFoundError } from 'common/error/NotFound';
import { ConflictError } from 'common/error/Conflict';

import { TodoRepository } from './repository.interface';
import { UndoneTodoUseCase } from './usecase.interface';
import { UndoneTodoPresenter } from './presenter.interface';

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
    if (todoEntity.getStatus() === TodoStatus.Undone) {
      throw new ConflictError('すでに未完了状態です');
    }

    todoEntity.undone();
    await this.repository.update(todoEntity);

    this.presenter.output(todoEntity);
  }
}
