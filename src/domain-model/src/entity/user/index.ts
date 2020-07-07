import { User, Scalars } from '../../types';
import { isValid } from './validator';

export class UserEntity implements User {
  public id: Scalars['ID'];

  constructor(data: User) {
    if (!isValid(data)) throw Error('invalid arguments');
    this.id = data.id;
  }

  isValid(): boolean {
    return isValid(this);
  }
}
