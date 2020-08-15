import { CreateTodoRequest } from 'schema/types';

import { TodoRepository } from './interface/repository';
import { CreateTodoUseCase } from './interface/usecase';
import { CreateTodoPresenter } from './interface/presenter';

export class CreateTodoInteractor implements CreateTodoUseCase {
  private repository: TodoRepository;
  private presenter: CreateTodoPresenter;

  constructor(repository: TodoRepository, presenter: CreateTodoPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: CreateTodoRequest) {
    const todoEntity = await this.repository.create(request);

    this.presenter.output(todoEntity);
  }
}
