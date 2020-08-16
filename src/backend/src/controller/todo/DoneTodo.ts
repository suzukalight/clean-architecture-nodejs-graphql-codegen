import { DoneTodoRequest } from 'schema/types';
import { DoneTodoUseCase } from 'domain-model/src/usecase/todo/interface/usecase';

export class DoneTodoController {
  private usecase: DoneTodoUseCase;

  constructor(usecase: DoneTodoUseCase) {
    this.usecase = usecase;
  }

  public async handle(request: DoneTodoRequest) {
    await this.usecase.handle(request);
  }
}
