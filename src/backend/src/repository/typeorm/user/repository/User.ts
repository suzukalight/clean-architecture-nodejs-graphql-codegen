import { Connection, Repository } from 'typeorm';
import { NotFoundError, RoleTypes } from 'common';
import { UserEntity, UserRepository, CreateUserInputData } from 'domain-model';

import { User as OrmUser, OrmUserFactory } from '../entity/User';

export class GqlUserRepository implements UserRepository {
  private dbConnection: Connection;
  private repository: Repository<OrmUser>;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
    this.repository = this.dbConnection.getRepository(OrmUser);
  }

  public async getById(id: string) {
    const result = await this.repository.findOne(id);
    if (!result) return null;

    return OrmUserFactory.toEntity(result);
  }

  public async create(_request: CreateUserInputData) {
    const user = new OrmUser([RoleTypes.Anonymous]);
    const repository = this.dbConnection.getRepository(OrmUser);
    const result = await repository.save(user);

    return OrmUserFactory.toEntity(result);
  }

  public async update(userEntity: UserEntity) {
    const todo = OrmUserFactory.fromEntity(userEntity);
    const saved = await this.repository.save(todo);

    return OrmUserFactory.toEntity(saved);
  }

  public async delete(id: string) {
    const todo = await this.repository.findOne(id);
    if (!todo) throw new NotFoundError();

    await this.repository.softDelete(id);

    return OrmUserFactory.toEntity(todo);
  }
}
