import { DoneTodoRequest } from 'schema/types';

import { DoneTodoUseCase } from '../../usecase/todo/usecase.interface';

export class DoneTodoController {
  private doneTodoUseCase: DoneTodoUseCase;

  constructor(doneTodoUseCase: DoneTodoUseCase) {
    this.doneTodoUseCase = doneTodoUseCase;
  }

  public async handle(request: DoneTodoRequest) {
    await this.doneTodoUseCase.handle(request);
  }
}
