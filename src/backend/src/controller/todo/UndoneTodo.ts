import { UndoneTodoRequest } from 'schema/types';

import { UndoneTodoUseCase } from '../../usecase/todo/interface/usecase';

export class UndoneTodoController {
  private undoneTodoUseCase: UndoneTodoUseCase;

  constructor(undoneTodoUseCase: UndoneTodoUseCase) {
    this.undoneTodoUseCase = undoneTodoUseCase;
  }

  public async handle(request: UndoneTodoRequest) {
    await this.undoneTodoUseCase.handle(request);
  }
}
