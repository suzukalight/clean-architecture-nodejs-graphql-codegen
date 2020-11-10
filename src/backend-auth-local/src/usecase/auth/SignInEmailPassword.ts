import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NotFoundError, AuthenticationFailedError } from 'common';

import { AuthEmailPasswordRepository } from './interface/repository';
import { SignInEmailPasswordInputData, SignInEmailPasswordUseCase } from './interface/usecase';
import { SignInEmailPasswordOutputData, SignInEmailPasswordPresenter } from './interface/presenter';

dotenv.config();

export class SignInEmailPasswordInteractor implements SignInEmailPasswordUseCase {
  private authRepository: AuthEmailPasswordRepository;
  private presenter: SignInEmailPasswordPresenter;

  constructor(
    authRepository: AuthEmailPasswordRepository,
    presenter: SignInEmailPasswordPresenter,
  ) {
    this.authRepository = authRepository;
    this.presenter = presenter;
  }

  public async handle(request: SignInEmailPasswordInputData) {
    const authEntity = await this.authRepository.getByEmail(request.email);
    if (!authEntity) throw new NotFoundError('そのメールアドレスは登録されていません');
    const userId = authEntity.getUserId().toString();

    // パスワードがマッチしているか
    const passwordMatched = await authEntity.getPassword().compareWith(request.password);
    if (!passwordMatched) throw new AuthenticationFailedError();

    // JWT トークンを生成
    const tokenPayload = { userId };
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    const token = jwt.sign(tokenPayload, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });

    const outputData: SignInEmailPasswordOutputData = {
      token,
      userId,
    };
    this.presenter.output(outputData);
  }
}
