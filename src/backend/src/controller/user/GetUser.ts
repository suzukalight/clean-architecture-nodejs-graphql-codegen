import { GetUserUseCase } from '../../usecase/user/usecase.interface';

export class GetUserController {
  private createUserUseCase: GetUserUseCase;

  constructor(createUserUseCase: GetUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  public async handle(id: string) {
    this.createUserUseCase.handle(id);
  }
}
