import { TodoRepository } from './interface/repository';
import { GetTodoInputData, GetTodoUseCase } from './interface/usecase';
import { GetTodoOutputData, GetTodoPresenter } from './interface/presenter';

export class GetTodoInteractor implements GetTodoUseCase {
  private repository: TodoRepository;
  private presenter: GetTodoPresenter;

  constructor(repository: TodoRepository, presenter: GetTodoPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: GetTodoInputData) {
    const todoEntity = await this.repository.getById(request?.id);

    const outputData: GetTodoOutputData = { todo: todoEntity?.toDto() ?? null };
    this.presenter.output(outputData);
  }
}
