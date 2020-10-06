import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleType, UserDto, UserEntity } from 'domain-model';

import { Todo } from '../../todo/entity/Todo';

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
  public static fromDto(user: UserDto): User {
    return {
      id: +user.id,
      email: user.email,
      roles: user.roles,
      createdAt: user.createdAt ?? undefined,
      updatedAt: user.updatedAt ?? undefined,
    };
  }

  public static fromEntity(userEntity: UserEntity) {
    const userSchema = userEntity.toDto();
    return OrmUserFactory.fromDto(userSchema);
  }

  public static toDto(user: User): UserDto {
    return {
      id: `${user.id}`,
      email: user.email,
      roles: user.roles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public static toEntity(user: User): UserEntity {
    const schema = OrmUserFactory.toDto(user);
    return new UserEntity(schema);
  }
}
