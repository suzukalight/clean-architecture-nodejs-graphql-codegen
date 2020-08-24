import { Connection, Repository } from 'typeorm';
import { AuthEmailPasswordRepository as AuthEmailPasswordRepositoryIF } from 'domain-model/src/usecase/auth/interface/repository';
import { AuthEmailPasswordDto } from 'domain-model/src/entity/auth/AuthEmailPasswordEntity';

import {
  AuthEmailPassword as OrmAuthEmailPassword,
  OrmAuthEmailPasswordFactory,
} from '../../../infrastructure/typeorm/entity/auth/EmailPassword';

export class AuthEmailPasswordRepository implements AuthEmailPasswordRepositoryIF {
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
    console.log('AuthEmailPasswordRepository', request, result);
    if (!result) return null;

    return OrmAuthEmailPasswordFactory.toEntity(result);
  }
}
