import { CreateTodoRequest } from 'schema/types';

import { CreateTodoUseCase } from '../../usecase/todo/usecase.interface';

export class CreateTodoController {
  private createTodoUseCase: CreateTodoUseCase;

  constructor(createTodoUseCase: CreateTodoUseCase) {
    this.createTodoUseCase = createTodoUseCase;
  }

  public async handle(request: CreateTodoRequest) {
    await this.createTodoUseCase.handle(request);
  }
}
