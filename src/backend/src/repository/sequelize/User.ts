import { Sequelize } from 'sequelize/types';
import { CreateUserRequest, User } from 'schema/types';
import { UserEntity } from 'domain-model/src/user/UserEntity';

import { UserRepository as UserRepositoryIF } from '../../usecase/user/repository.interface';

export class UserRepository implements UserRepositoryIF {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  public async getById(id: string) {
    const userModel = await this.sequelize.models.User.findByPk(+id);
    const user = (userModel?.toJSON() as User) ?? null;
    const entity = new UserEntity(user);
    return entity;
  }

  public async create(request: CreateUserRequest) {
    const userModel = await this.sequelize.models.User.create(request);
    const user = (userModel?.toJSON() as User) ?? null;
    const entity = new UserEntity(user);
    return entity;
  }
}
