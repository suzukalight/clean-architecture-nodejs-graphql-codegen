import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { AuthAuth0Entity, AuthAuth0Dto } from 'domain-model';

import { User } from '../../user/entity/User';

@Entity('authAuth0s')
export class AuthAuth0 {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId: number;

  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column()
  auth0UserId: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  constructor(userId: number, auth0UserId: string) {
    this.userId = userId;
    this.auth0UserId = auth0UserId;
  }
}

export class OrmAuthAuth0Factory {
  public static toDto(auth: AuthAuth0): AuthAuth0Dto {
    return {
      auth0UserId: auth.auth0UserId,
      userId: `${auth.userId}`,
    };
  }

  public static toEntity(auth: AuthAuth0): AuthAuth0Entity {
    const schema = OrmAuthAuth0Factory.toDto(auth);
    return new AuthAuth0Entity(schema);
  }
}
