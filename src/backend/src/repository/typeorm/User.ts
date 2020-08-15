import { Connection } from 'typeorm';
import { CreateUserRequest, User } from 'schema/types';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';

import { UserRepository as UserRepositoryIF } from '../../usecase/user/interface/repository';
import { User as OrmUser } from '../../infrastructure/typeorm/entity/User';

export class UserRepository implements UserRepositoryIF {
  private dbConnection: Connection;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
  }

  public async getById(id: string) {
    const repository = this.dbConnection.getRepository(OrmUser);
    const result = await repository.findOne(id);
    if (!result) return null;

    const entity = new UserEntity((result as unknown) as User);
    return entity;
  }

  public async create(request: CreateUserRequest) {
    const user = new OrmUser(request.email);
    const repository = this.dbConnection.getRepository(OrmUser);
    const result = await repository.save(user);

    const entity = new UserEntity((result as unknown) as User);
    return entity;
  }
}
