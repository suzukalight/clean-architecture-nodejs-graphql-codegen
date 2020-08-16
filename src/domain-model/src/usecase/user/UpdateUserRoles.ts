import { UpdateUserRolesRequest } from 'schema/types';
import { NotFoundError } from 'common/error/NotFound';

import { UserRepository } from './interface/repository';
import { UpdateUserRolesUseCase } from './interface/usecase';
import { UpdateUserRolesPresenter } from './interface/presenter';
import { Role } from '../../entity/common/Role';

export class UpdateUserRolesInteractor implements UpdateUserRolesUseCase {
  private repository: UserRepository;
  private presenter: UpdateUserRolesPresenter;

  constructor(repository: UserRepository, presenter: UpdateUserRolesPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: UpdateUserRolesRequest) {
    const userEntity = await this.repository.getById(request.id);
    if (!userEntity) throw new NotFoundError();

    const roles = request.roles.map((role) => new Role(role));
    userEntity.updateRoles(roles);

    await this.repository.update(userEntity);

    this.presenter.output(userEntity);
  }
}
