import { GetTodoUseCase } from 'domain-model/src/usecase/todo/interface/usecase';

export class GetTodoController {
  private usecase: GetTodoUseCase;

  constructor(usecase: GetTodoUseCase) {
    this.usecase = usecase;
  }

  public async handle(id: string) {
    await this.usecase.handle(id);
  }
}
