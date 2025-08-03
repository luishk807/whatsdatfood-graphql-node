import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db';

interface UserSearchTypesInterface {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface UserSearchTypesInput
  extends Optional<UserSearchTypesInterface, 'id'> {}
export interface UserSearchTypesOutput
  extends Required<UserSearchTypesInterface> {}

class UserSearchTypes
  extends Model<UserSearchTypesInterface, UserSearchTypesInput>
  implements UserSearchTypesInterface
{
  public id!: number;
  public name!: string;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

UserSearchTypes.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    underscored: true,
  },
);

export default UserSearchTypes;
