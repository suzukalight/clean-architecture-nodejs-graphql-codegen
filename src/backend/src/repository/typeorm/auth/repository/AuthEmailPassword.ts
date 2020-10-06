import { Connection, Repository } from 'typeorm';
import { AuthEmailPasswordRepository, AuthEmailPasswordDto } from 'domain-model';

import {
  AuthEmailPassword as OrmAuthEmailPassword,
  OrmAuthEmailPasswordFactory,
} from '../entity/AuthEmailPassword';

export class GqlAuthEmailPasswordRepository implements AuthEmailPasswordRepository {
  private dbConnection: Connection;
  private repository: Repository<OrmAuthEmailPassword>;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
    this.repository = this.dbConnection.getRepository(OrmAuthEmailPassword);
  }

  public async getByEmail(email: string) {
    const result = await this.repository.findOne({ email });
    if (!result) return null;

    return OrmAuthEmailPasswordFactory.toEntity(result);
  }

  public async create(request: AuthEmailPasswordDto) {
    const auth = new OrmAuthEmailPassword(
      +request.userId,
      request.email,
      request.passwordEncrypted,
    );
    const result = await this.repository.save(auth);
    if (!result) return null;

    return OrmAuthEmailPasswordFactory.toEntity(result);
  }
}
