import { AuthAuth0Dto, denyIllegalAuthAuth0Dto } from './AuthAuth0Dto';
import { ID } from '../common/ID';

export class AuthAuth0Entity {
  private auth0UserId: ID;
  private userId: ID;

  constructor(dto: AuthAuth0Dto) {
    denyIllegalAuthAuth0Dto(dto);
    this.auth0UserId = new ID(dto.auth0UserId);
    this.userId = new ID(dto.userId);
  }

  getAuth0UserId() {
    return this.auth0UserId;
  }

  getUserId() {
    return this.userId;
  }
}
