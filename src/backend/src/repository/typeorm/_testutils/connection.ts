import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

import { User } from '../user/entity/User';
import { Todo } from '../todo/entity/Todo';

export class SqliteDbConnection {
  private path: string;
  private connection: Connection | null;

  constructor(path?: string) {
    this.path = path ?? `./test_db/${uuidv4()}.sqlite`;
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
    this.connection = await createConnection({
      type: 'sqlite',
      name: this.path,
      database: this.path,
      entities: [User, Todo],
      synchronize: true,
      logging: false,
      // logging: true,
      // logger: 'file',
    });
    if (!this.connection) throw new Error('SQLite DB への接続に失敗しました');

    return this.connection!;
  }

  async disconnect() {
    this.connection?.close();
  }

  async dispose() {
    await this.disconnect();
    if (this.path !== ':memory:') fs.unlinkSync(this.path);
  }
}
