import { TodoRepository } from './repository.interface';
import { GetTodoUseCase } from './usecase.interface';
import { GetTodoPresenter } from './presenter.interface';

export class GetTodoInteractor implements GetTodoUseCase {
  private repository: TodoRepository;
  private presenter: GetTodoPresenter;

  constructor(repository: TodoRepository, presenter: GetTodoPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(id: string) {
    const userEntity = await this.repository.getById(id);

    this.presenter.output(userEntity);
  }
}
