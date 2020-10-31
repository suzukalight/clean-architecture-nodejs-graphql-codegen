import { Connection, LessThanOrEqual, Repository } from 'typeorm';
import {
  UserQueryService,
  denyIfNotSet,
  GetUserByIdQuery,
  GetUserByIdQueryResult,
} from 'domain-model';
import addDays from 'date-fns/addDays';

import { User as OrmUser, OrmUserFactory } from '../entity/User';

export class GqlUserQueryService implements UserQueryService {
  private dbConnection: Connection;
  private repository: Repository<OrmUser>;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
    this.repository = this.dbConnection.getRepository(OrmUser);
  }

  public async getUserById(query: GetUserByIdQuery) {
    denyIfNotSet(query, ['id']);
    const { id } = query;

    const result = await this.repository.findOne(id, {
      relations: ['todos'], // eager loading で resolver の負荷を下げる
    });
    if (!result) return { user: null };

    const res: GetUserByIdQueryResult = {
      user: OrmUserFactory.toDto(result),
    };
    return res;
  }
}
