import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';

interface UserRolesInterface {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface UserRolesInput extends Optional<UserRolesInterface, 'id'> {}
export interface UserRoleOutput extends Required<UserRolesInterface> {}

class UserRoles
  extends Model<UserRolesInterface, UserRolesInput>
  implements UserRolesInterface
{
  public id!: number;
  public name!: string;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

UserRoles.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    underscored: true,
  },
);

export default UserRoles;
