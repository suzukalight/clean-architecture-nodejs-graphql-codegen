import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthEmailPasswordDto } from '../../../../entity/auth/AuthEmailPasswordDto';
import { AuthEmailPasswordEntity } from '../../../../entity/auth/AuthEmailPasswordEntity';

@Entity('authEmailPasswords')
export class AuthEmailPassword {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId: number;

  @Column()
  email: string;

  @Column()
  passwordEncrypted: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  constructor(userId: number, email: string, passwordEncrypted: string) {
    this.userId = userId;
    this.email = email;
    this.passwordEncrypted = passwordEncrypted;
  }
}

export class OrmAuthEmailPasswordFactory {
  public static toDto(auth: AuthEmailPassword): AuthEmailPasswordDto {
    return {
      email: auth.email,
      passwordEncrypted: auth.passwordEncrypted,
      userId: `${auth.userId}`,
    };
  }

  public static toEntity(auth: AuthEmailPassword): AuthEmailPasswordEntity {
    const schema = OrmAuthEmailPasswordFactory.toDto(auth);
    return new AuthEmailPasswordEntity(schema);
  }
}
