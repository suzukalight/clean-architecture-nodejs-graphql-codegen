import { UpdateUserRolesRequest } from 'schema/types';
import { UpdateUserRolesUseCase } from 'domain-model/src/usecase/user/interface/usecase';

export class UpdateUserRolesController {
  private usecase: UpdateUserRolesUseCase;

  constructor(usecase: UpdateUserRolesUseCase) {
    this.usecase = usecase;
  }

  public async handle(request: UpdateUserRolesRequest) {
    await this.usecase.handle(request);
  }
}
