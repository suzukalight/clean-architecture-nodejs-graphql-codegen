import { DeleteTodoRequest } from 'schema/types';
import { DeleteTodoUseCase } from 'domain-model/src/usecase/todo/interface/usecase';

export class DeleteTodoController {
  private usecase: DeleteTodoUseCase;

  constructor(usecase: DeleteTodoUseCase) {
    this.usecase = usecase;
  }

  public async handle(request: DeleteTodoRequest) {
    await this.usecase.handle(request);
  }
}
