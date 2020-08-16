import { Connection, Repository } from 'typeorm';
import { User, CreateUserRequest } from 'schema/types';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';
import { RoleTypes } from 'domain-model/src/entity/common/Role';
import { UserRepository as UserRepositoryIF } from 'domain-model/src/usecase/user/interface/repository';

import { User as OrmUser, OrmUserFactory } from '../../infrastructure/typeorm/entity/User';

export class UserRepository implements UserRepositoryIF {
  private dbConnection: Connection;
  private repository: Repository<OrmUser>;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
    this.repository = this.dbConnection.getRepository(OrmUser);
  }

  public async getById(id: string) {
    const result = await this.repository.findOne(id);
    if (!result) return null;

    const entity = new UserEntity((result as unknown) as User);
    return entity;
  }

  public async create(request: CreateUserRequest) {
    const user = new OrmUser(request.email, [RoleTypes.Anonymous]);
    const repository = this.dbConnection.getRepository(OrmUser);
    const result = await repository.save(user);

    const entity = new UserEntity((result as unknown) as User);
    return entity;
  }

  public async update(userEntity: UserEntity) {
    const todo = OrmUserFactory.fromEntity(userEntity);
    const saved = await this.repository.save(todo);

    return OrmUserFactory.toEntity(saved);
  }
}
