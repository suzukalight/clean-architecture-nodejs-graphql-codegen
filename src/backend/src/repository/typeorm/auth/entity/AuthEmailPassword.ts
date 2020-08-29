import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AuthEmailPasswordEntity, AuthEmailPasswordDto } from 'domain-model';

import { User } from '../../user/entity/User';

@Entity('authEmailPasswords')
export class AuthEmailPassword {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'userId' })
  user?: User;

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
  public static toSchema(auth: AuthEmailPassword): AuthEmailPasswordDto {
    return {
      email: auth.email,
      passwordEncrypted: auth.passwordEncrypted,
      userId: `${auth.userId}`,
    };
  }

  public static toEntity(auth: AuthEmailPassword): AuthEmailPasswordEntity {
    const schema = OrmAuthEmailPasswordFactory.toSchema(auth);
    return new AuthEmailPasswordEntity(schema);
  }
}
