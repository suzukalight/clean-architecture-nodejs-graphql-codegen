import { CreateTodoRequest } from 'schema/types';
import { CreateTodoUseCase } from 'domain-model/src/usecase/todo/interface/usecase';

export class CreateTodoController {
  private usecase: CreateTodoUseCase;

  constructor(usecase: CreateTodoUseCase) {
    this.usecase = usecase;
  }

  public async handle(request: CreateTodoRequest) {
    await this.usecase.handle(request);
  }
}
