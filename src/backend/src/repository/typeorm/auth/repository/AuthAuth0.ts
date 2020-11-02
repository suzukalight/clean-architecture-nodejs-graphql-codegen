import { Connection, Repository } from 'typeorm';
import { AuthAuth0Repository, AuthAuth0Dto } from 'domain-model';

import { AuthAuth0 as OrmAuthAuth0, OrmAuthAuth0Factory } from '../entity/AuthAuth0';

export class GqlAuthAuth0Repository implements AuthAuth0Repository {
  private dbConnection: Connection;
  private repository: Repository<OrmAuthAuth0>;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
    this.repository = this.dbConnection.getRepository(OrmAuthAuth0);
  }

  public async getByAuth0UserId(auth0UserId: string) {
    const result = await this.repository.findOne({ auth0UserId });
    if (!result) return null;

    return OrmAuthAuth0Factory.toEntity(result);
  }

  public async create(request: AuthAuth0Dto) {
    const auth = new OrmAuthAuth0(+request.userId, request.auth0UserId);
    const result = await this.repository.save(auth);
    if (!result) return null;

    return OrmAuthAuth0Factory.toEntity(result);
  }
}
