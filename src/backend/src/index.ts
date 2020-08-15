import { createDbConnection } from './infrastructure/typeorm/connection';
import { createAndRunApolloServer } from './infrastructure/apollo-server';

createAndRunApolloServer(createDbConnection);
