import { NotFoundError } from 'common';

import { TodoRepository } from './interface/repository';
import { DeleteTodoInputData, DeleteTodoUseCase } from './interface/usecase';
import { DeleteTodoOutputData, DeleteTodoPresenter } from './interface/presenter';
import { UserEntity } from '../../entity/user/UserEntity';
import { allowOnlyWhenActorIsOwner } from '../../policy/decision/common';

export class DeleteTodoInteractor implements DeleteTodoUseCase {
  private repository: TodoRepository;
  private presenter: DeleteTodoPresenter;

  constructor(repository: TodoRepository, presenter: DeleteTodoPresenter) {
    this.repository = repository;
    this.presenter = presenter;
  }

  public async handle(request: DeleteTodoInputData, actor: UserEntity) {
    const todoEntity = await this.repository.getById(request.id);
    if (!todoEntity) throw new NotFoundError();

    // 作成した本人のみ削除できるものとする
    allowOnlyWhenActorIsOwner(todoEntity.getOwnerId(), actor);

    const deletedEntity = await this.repository.delete(request?.id);

    const outputData: DeleteTodoOutputData = { todo: deletedEntity.toDto() };
    this.presenter.output(outputData);
  }
}
