import { GetUserInteractor } from '../GetUser';
import { MockUserRepository } from '../_mocks/MockUserRepository';
import { MockGetUserPresenter } from '../_mocks/MockUserPresenter';

/**
 * ユーザを1名作成しておく
 */
const setup = async () => {
  // repository
  const repository = new MockUserRepository();
  const userEntity = await repository.create({});
  const userId = userEntity.getId().toString();

  // interactor
  const presenter = new MockGetUserPresenter();
  const interactor = new GetUserInteractor(repository, presenter);

  return { userId, interactor, presenter };
};

describe('GetUserInteractor', () => {
  test('リクエストを処理し、エンティティを取得できた', async () => {
    const { userId, interactor, presenter } = await setup();

    await interactor.handle({ id: userId });

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user?.id).toBe(userId);
  });

  test('存在しないIDを指定したため、nullが返された', async () => {
    const { interactor, presenter } = await setup();

    await interactor.handle({ id: '99999' });

    // response として null が得られた
    const response = presenter.getResponse();
    expect(response?.user).toBeNull();
  });
});
