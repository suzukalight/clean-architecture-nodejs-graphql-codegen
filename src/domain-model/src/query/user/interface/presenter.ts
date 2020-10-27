import { Nullable } from '../../type';
import { UserDto } from '../../../entity';

export type GetUserByIdOutputData = {
  user: Nullable<UserDto>;
};

export interface GetUserByIdPresenter {
  output(response: GetUserByIdOutputData): void;
}
