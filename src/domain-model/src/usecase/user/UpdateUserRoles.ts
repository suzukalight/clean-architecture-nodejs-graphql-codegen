import { NotFoundError, Role, RoleType  } from 'common';

import { UserRepository } from './interface/repository';
import { UpdateUserRolesInputData, UpdateUserRolesUseCase } from './interface/usecase';
import { UpdateUserRolesOutputData, UpdateUserRolesPresenter } from './interface/presenter';
import { UserEntity } from '../../entity/user/UserEntity';
import { allowOnlyWhenActorIsOwner } from '../../policy/decision/common';

export class UpdateUserRolesInteractor implements UpdateUserRolesUseCase {
  private repository: UserRepository;
  private presenter: UpdateUserRolesPresenter;

  constructor(repository: UserRepository, presenter: UpdateUserRolesPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: UpdateUserRolesInputData, actor: UserEntity) {
    const userEntity = await this.repository.getById(request.id);
    if (!userEntity) throw new NotFoundError();

    allowOnlyWhenActorIsOwner(userEntity.getId(), actor);

    const roles = request.roles.map((role) => new Role(role as RoleType));
    userEntity.updateRoles(roles);

    await this.repository.update(userEntity);

    const outputData: UpdateUserRolesOutputData = { user: userEntity.toDto() };
    this.presenter.output(outputData);
  }
}
