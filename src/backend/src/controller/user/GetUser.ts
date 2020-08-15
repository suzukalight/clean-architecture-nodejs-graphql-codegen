import { GetUserUseCase } from 'domain-model/src/usecase/user/interface/usecase';

export class GetUserController {
  private createUserUseCase: GetUserUseCase;

  constructor(createUserUseCase: GetUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  public async handle(id: string) {
    await this.createUserUseCase.handle(id);
  }
}
