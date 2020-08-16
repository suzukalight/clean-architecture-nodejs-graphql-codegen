import { SignInEmailPasswordRequest } from 'schema/types';
import { SignInEmailPasswordUseCase } from 'domain-model/src/usecase/auth/interface/usecase';

export class SignInEmailPasswordController {
  private usecase: SignInEmailPasswordUseCase;

  constructor(usecase: SignInEmailPasswordUseCase) {
    this.usecase = usecase;
  }

  public async handle(request: SignInEmailPasswordRequest) {
    await this.usecase.handle(request);
  }
}
