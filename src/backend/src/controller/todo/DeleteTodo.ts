import { DeleteTodoRequest } from 'schema/types';

import { DeleteTodoUseCase } from '../../usecase/todo/interface/usecase';

export class DeleteTodoController {
  private deleteTodoUseCase: DeleteTodoUseCase;

  constructor(deleteTodoUseCase: DeleteTodoUseCase) {
    this.deleteTodoUseCase = deleteTodoUseCase;
  }

  public async handle(request: DeleteTodoRequest) {
    await this.deleteTodoUseCase.handle(request);
  }
}
