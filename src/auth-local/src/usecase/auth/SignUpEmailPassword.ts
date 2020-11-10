import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ConflictError } from 'common';

import { AuthEmailPasswordRepository } from './interface/repository';
import { SignUpEmailPasswordInputData, SignUpEmailPasswordUseCase } from './interface/usecase';
import { SignUpEmailPasswordOutputData, SignUpEmailPasswordPresenter } from './interface/presenter';
import { encryptPassword } from '../../entity/common/Password';

dotenv.config();

export class SignUpEmailPasswordInteractor implements SignUpEmailPasswordUseCase {
  private authRepository: AuthEmailPasswordRepository;
  private presenter: SignUpEmailPasswordPresenter;

  constructor(
    authRepository: AuthEmailPasswordRepository,
    presenter: SignUpEmailPasswordPresenter,
  ) {
    this.authRepository = authRepository;
    this.presenter = presenter;
  }

  public async handle(request: SignUpEmailPasswordInputData) {
    // すでに登録されているメールアドレスでは登録できない
    const existedAuthEntity = await this.authRepository.getByEmail(request.email);
    if (existedAuthEntity) throw new ConflictError('そのメールアドレスはすでに登録されています');
    
    // auth エンティティを生成
    const passwordEncrypted = await encryptPassword(request.password);
    await this.authRepository.create({
      email: request.email,
      passwordEncrypted,
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
    const outputData: SignUpEmailPasswordOutputData = {
      token,
      user: userEntity.toDto(),
    };
    this.presenter.output(outputData);
  }
}
