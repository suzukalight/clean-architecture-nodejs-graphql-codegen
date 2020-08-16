import { GetUserUseCase } from 'domain-model/src/usecase/user/interface/usecase';

export class GetUserController {
  private usecase: GetUserUseCase;

  constructor(usecase: GetUserUseCase) {
    this.usecase = usecase;
  }

  public async handle(id: string) {
    await this.usecase.handle(id);
  }
}
