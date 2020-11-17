import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

import { User } from '../../../src/repository/typeorm/user/entity/User';
import { Todo } from '../../../src/repository/typeorm/todo/entity/Todo';
import { seedAll } from '../../../src/infrastructure/typeorm/seeder/seedAll';

export const getRandomDbPath = () => `./test_db/${uuidv4()}.sqlite`;

export const createDbConnection = async (randomDbPath: string) =>
  createConnection({
    type: 'sqlite',
    name: randomDbPath,
    database: randomDbPath,
    entities: [User, Todo],
    synchronize: true,
    logging: false,
  });

export const deleteDbFile = (dbPath: string) => {
  fs.unlinkSync(dbPath);
};

export class SqliteDbConnection {
  private path: string;
  private connection: Connection | null;

  constructor(path?: string) {
    this.path = path ?? getRandomDbPath();
  }

  getDbPath() {
    return this.path;
  }

  getConnection() {
    return this.connection;
  }

  setDbPath(path: string) {
    this.path = path;
  }

  async connect() {
    this.connection = await createDbConnection(this.path);
    if (!this.connection) throw new Error('SQLite DB への接続に失敗しました');

    return this.connection!;
  }

  async disconnect() {
    this.connection?.close();
  }

  async dispose() {
    await this.disconnect();
    if (this.path !== ':memory:') deleteDbFile(this.path);
  }

  async seedAll() {
    if (!this.connection) return;
    await seedAll(this.connection);
  }
}
