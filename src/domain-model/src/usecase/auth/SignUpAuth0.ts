import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ConflictError } from 'common';

import { AuthAuth0Repository } from './interface/repository';
import { SignUpAuth0InputData, SignUpAuth0UseCase } from './interface/usecase';
import { SignUpAuth0OutputData, SignUpAuth0Presenter } from './interface/presenter';
import { UserRepository } from '../user/interface/repository';

dotenv.config();

export class SignUpAuth0Interactor implements SignUpAuth0UseCase {
  private authRepository: AuthAuth0Repository;
  private userRepository: UserRepository;
  private presenter: SignUpAuth0Presenter;

  constructor(
    authRepository: AuthAuth0Repository,
    userRepository: UserRepository,
    presenter: SignUpAuth0Presenter,
  ) {
    this.authRepository = authRepository;
    this.userRepository = userRepository;
    this.presenter = presenter;
  }

  public async handle(request: SignUpAuth0InputData) {
    // すでに登録されているメールアドレスでは登録できない
    const existedAuthEntity = await this.authRepository.getByAuth0UserId(request.auth0UserId);
    if (existedAuthEntity) throw new ConflictError('そのauth0UserIdはすでに登録されています');

    // TODO: トランザクション

    // user エンティティを生成
    const userEntity = await this.userRepository.create({});
    const userId = userEntity.getId().toString();

    // auth エンティティを生成
    await this.authRepository.create({
      auth0UserId: request.auth0UserId,
      userId,
    });

    // JWT トークンを生成
    const tokenPayload = {
      id: userId,
      roles: userEntity.getRoles().map((role) => role.toString()),
    };
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    const token = jwt.sign(tokenPayload, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });

    // JWTトークンとサインアップ済みユーザを返す
    const outputData: SignUpAuth0OutputData = {
      token,
      user: userEntity.toDto(),
    };
    this.presenter.output(outputData);
  }
}
