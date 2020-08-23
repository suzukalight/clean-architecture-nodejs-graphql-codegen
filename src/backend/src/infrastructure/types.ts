import { Connection } from 'typeorm';

export type CreateDbConnection = () => Promise<Connection>;
