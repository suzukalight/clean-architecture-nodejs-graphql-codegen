import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NotFoundError } from 'common';

import { AuthAuth0Repository } from './interface/repository';
import { SignInAuth0InputData, SignInAuth0UseCase } from './interface/usecase';
import { SignInAuth0OutputData, SignInAuth0Presenter } from './interface/presenter';
import { UserRepository } from '../user/interface/repository';

dotenv.config();

export class SignInAuth0Interactor implements SignInAuth0UseCase {
  private authRepository: AuthAuth0Repository;
  private userRepository: UserRepository;
  private presenter: SignInAuth0Presenter;

  constructor(
    authRepository: AuthAuth0Repository,
    userRepository: UserRepository,
    presenter: SignInAuth0Presenter,
  ) {
    this.authRepository = authRepository;
    this.userRepository = userRepository;
    this.presenter = presenter;
  }

  public async handle(request: SignInAuth0InputData) {
    const authEntity = await this.authRepository.getByAuth0UserId(request.auth0UserId);
    if (!authEntity) throw new NotFoundError('そのauth0UserIdは登録されていません');

    // 対応する user エンティティを取得
    const userId = authEntity.getUserId().toString();
    const userEntity = await this.userRepository.getById(userId);
    if (!userEntity) throw new NotFoundError('認証結果に対応するユーザが見つかりません');

    // JWT トークンを生成
    const tokenPayload = {
      id: userId,
      roles: userEntity.getRoles().map((role) => role.toString()),
    };
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    const token = jwt.sign(tokenPayload, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });

    const outputData: SignInAuth0OutputData = {
      token,
      user: userEntity.toDto(),
    };
    this.presenter.output(outputData);
  }
}
