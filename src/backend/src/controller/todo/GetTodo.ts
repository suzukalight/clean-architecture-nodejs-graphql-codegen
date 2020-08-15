import { GetTodoUseCase } from 'domain-model/src/usecase/todo/interface/usecase';

export class GetTodoController {
  private createTodoUseCase: GetTodoUseCase;

  constructor(createTodoUseCase: GetTodoUseCase) {
    this.createTodoUseCase = createTodoUseCase;
  }

  public async handle(id: string) {
    await this.createTodoUseCase.handle(id);
  }
}
