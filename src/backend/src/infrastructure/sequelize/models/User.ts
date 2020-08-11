import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../sequelize';

class User extends Model {
  public id!: number;
  public email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
  },
  {
    tableName: 'users',
    sequelize: sequelize,
  },
);

export { User };
