import { AuthEmailPasswordDto, denyIllegalAuthEmailPasswordDto } from './AuthEmailPasswordDto';
import { Email } from '../common/Email';
import { Password } from '../common/Password';
import { ID } from '../common/ID';

export class AuthEmailPasswordEntity {
  private email: Email;
  private passwordEncrypted: Password;
  private userId: ID;

  constructor(dto: AuthEmailPasswordDto) {
    denyIllegalAuthEmailPasswordDto(dto);
    this.email = new Email(dto.email);
    this.passwordEncrypted = new Password(dto.passwordEncrypted);
    this.userId = new ID(dto.userId);
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.passwordEncrypted;
  }

  getUserId() {
    return this.userId;
  }
}
