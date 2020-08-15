import { TodoRepository } from './interface/repository';
import { GetTodoUseCase } from './interface/usecase';
import { GetTodoPresenter } from './interface/presenter';

export class GetTodoInteractor implements GetTodoUseCase {
  private repository: TodoRepository;
  private presenter: GetTodoPresenter;

  constructor(repository: TodoRepository, presenter: GetTodoPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(id: string) {
    const todoEntity = await this.repository.getById(id);

    this.presenter.output(todoEntity);
  }
}
