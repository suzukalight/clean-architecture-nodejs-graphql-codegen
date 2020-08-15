import { DeleteTodoRequest } from 'schema/types';
import { NotFoundError } from 'common/error/NotFound';

import { TodoRepository } from './interface/repository';
import { DeleteTodoUseCase } from './interface/usecase';
import { DeleteTodoPresenter } from './interface/presenter';

export class DeleteTodoInteractor implements DeleteTodoUseCase {
  private repository: TodoRepository;
  private presenter: DeleteTodoPresenter;

  constructor(repository: TodoRepository, presenter: DeleteTodoPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: DeleteTodoRequest) {
    const todoEntity = await this.repository.getById(request.id);
    if (!todoEntity) throw new NotFoundError();

    const deletedEntity = await this.repository.delete(request);

    this.presenter.output(deletedEntity);
  }
}
