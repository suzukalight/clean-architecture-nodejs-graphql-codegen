import { CreateUserRequest } from 'schema/types';

import { CreateUserUseCase } from '../../usecase/user/usecase.interface';

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  public async handle(request: CreateUserRequest) {
    await this.createUserUseCase.handle(request);
  }
}
