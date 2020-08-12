import { CreateTodoRequest } from 'schema/types';

import { TodoRepository } from './repository.interface';
import { CreateTodoUseCase } from './usecase.interface';
import { CreateTodoPresenter } from './presenter.interface';

export class CreateTodoInteractor implements CreateTodoUseCase {
  private repository: TodoRepository;
  private presenter: CreateTodoPresenter;

  constructor(repository: TodoRepository, presenter: CreateTodoPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: CreateTodoRequest) {
    const TodoEntity = await this.repository.create(request);

    this.presenter.output(TodoEntity);
  }
}
