import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User as UserSchema } from 'schema/types';
import { Todo } from '../../todo/entity/Todo';
import { RoleType } from 'domain-model/src/entity/common/Role';
import { UserEntity } from 'domain-model/src/entity/user/UserEntity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email: string;

  @Column('simple-array')
  roles: RoleType[];

  @OneToMany(() => Todo, (todo) => todo.owner)
  todos?: Todo[];

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  constructor(email: string, roles: RoleType[]) {
    this.email = email;
    this.roles = roles;
  }
}

export class OrmUserFactory {
  public static fromSchema(user: UserSchema): User {
    return {
      id: +user.id,
      email: user.email,
      roles: user.roles,
      createdAt: user.createdAt ?? undefined,
      updatedAt: user.updatedAt ?? undefined,
    };
  }

  public static fromEntity(userEntity: UserEntity) {
    const userSchema = userEntity.toJSON();
    return OrmUserFactory.fromSchema(userSchema);
  }

  public static toSchema(user: User): UserSchema {
    return {
      id: `${user.id}`,
      email: user.email,
      roles: user.roles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public static toEntity(user: User): UserEntity {
    const schema = OrmUserFactory.toSchema(user);
    return new UserEntity(schema);
  }
}
