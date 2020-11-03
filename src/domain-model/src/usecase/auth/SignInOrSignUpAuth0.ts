import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NotFoundError } from 'common';

import { AuthAuth0Repository } from './interface/repository';
import { SignInOrSignUpAuth0InputData, SignInOrSignUpAuth0UseCase } from './interface/usecase';
import { SignInOrSignUpAuth0OutputData, SignInOrSignUpAuth0Presenter } from './interface/presenter';
import { UserRepository } from '../user/interface/repository';
import { UserEntity } from '../../entity';

dotenv.config();

export class SignInOrSignUpAuth0Interactor implements SignInOrSignUpAuth0UseCase {
  private authRepository: AuthAuth0Repository;
  private userRepository: UserRepository;
  private presenter: SignInOrSignUpAuth0Presenter;

  constructor(
    authRepository: AuthAuth0Repository,
    userRepository: UserRepository,
    presenter: SignInOrSignUpAuth0Presenter,
  ) {
    this.authRepository = authRepository;
    this.userRepository = userRepository;
    this.presenter = presenter;
  }

  public async handle(request: SignInOrSignUpAuth0InputData) {
    const { auth0UserId } = request;
    const authEntity = await this.authRepository.getByAuth0UserId(auth0UserId);
    const isNewUser = !authEntity;
    let userEntity: UserEntity | null;

    if (isNewUser) {
      // 未登録のユーザ
      // user エンティティを生成
      userEntity = await this.userRepository.create({});
      const userId = userEntity.getId().toString();

      // auth エンティティを生成
      await this.authRepository.create({
        auth0UserId,
        userId,
      });
    } else {
      // 登録済みのユーザ
      // 対応する user エンティティを取得
      const userId = authEntity!.getUserId().toString();
      userEntity = await this.userRepository.getById(userId);
      if (!userEntity) throw new NotFoundError('認証結果に対応するユーザが見つかりません');
    }

    const outputData: SignInOrSignUpAuth0OutputData = {
      user: userEntity!.toDto(),
      isNewUser,
    };
    this.presenter.output(outputData);
  }
}
