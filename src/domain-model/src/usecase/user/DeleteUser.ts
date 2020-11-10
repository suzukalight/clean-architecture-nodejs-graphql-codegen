import { NotFoundError, UnauthorizedError, RoleTypes } from 'common';

import { UserRepository } from './interface/repository';
import { DeleteUserInputData, DeleteUserUseCase } from './interface/usecase';
import { DeleteUserOutputData, DeleteUserPresenter } from './interface/presenter';
import { UserEntity } from '../../entity/user/UserEntity';
import { denyUnauthenticated } from '../../policy/decision/common';

/**
 * 対象がactorと一致する、またはactorがAdminである場合のみ、許可する
 */
const allowOnlyWhenActorIsOwnerOrAdmin = (
  target: UserEntity | null,
  actor: UserEntity | null,
  message?: string,
) => {
  denyUnauthenticated(actor, message);

  if (actor?.getRoles().some((role) => role.isEqual(RoleTypes.Admin))) return;
  if (actor?.getId().isEqual(target?.getId()!)) return;

  throw new UnauthorizedError(message);
};

export class DeleteUserInteractor implements DeleteUserUseCase {
  private repository: UserRepository;
  private presenter: DeleteUserPresenter;

  constructor(repository: UserRepository, presenter: DeleteUserPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: DeleteUserInputData, actor: UserEntity) {
    const userEntity = await this.repository.getById(request.id);
    if (!userEntity) throw new NotFoundError();

    allowOnlyWhenActorIsOwnerOrAdmin(userEntity, actor);

    const deletedEntity = await this.repository.delete(request?.id);

    const outputData: DeleteUserOutputData = { user: deletedEntity.toDto() };
    this.presenter.output(outputData);
  }
}
