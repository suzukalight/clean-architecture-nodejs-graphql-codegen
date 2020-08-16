import { UndoneTodoRequest } from 'schema/types';
import { UndoneTodoUseCase } from 'domain-model/src/usecase/todo/interface/usecase';

export class UndoneTodoController {
  private usecase: UndoneTodoUseCase;

  constructor(usecase: UndoneTodoUseCase) {
    this.usecase = usecase;
  }

  public async handle(request: UndoneTodoRequest) {
    await this.usecase.handle(request);
  }
}
