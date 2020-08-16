import { CreateUserRequest } from 'schema/types';
import { CreateUserUseCase } from 'domain-model/src/usecase/user/interface/usecase';

export class CreateUserController {
  private usecase: CreateUserUseCase;

  constructor(usecase: CreateUserUseCase) {
    this.usecase = usecase;
  }

  public async handle(request: CreateUserRequest) {
    await this.usecase.handle(request);
  }
}
