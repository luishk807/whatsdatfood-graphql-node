import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db/index';
interface StatusesInterface {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface StatusesInput extends Optional<StatusesInterface, 'id'> {}
export interface StatusesOutput extends Required<StatusesInterface> {}

class Statuses
  extends Model<StatusesInterface, StatusesInput>
  implements StatusesInterface
{
  public id!: number;
  public name!: string;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
}

Statuses.init(
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

export default Statuses;
