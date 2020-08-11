import path from 'path';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, './config.json'))[env]; // eslint-disable-line @typescript-eslint/no-var-requires

export const sequelize = new Sequelize(config);
