import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db/index';
interface HolidaysInterface {
  id: number;
  name: string;
  status_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface HolidaysInput extends Optional<HolidaysInterface, 'id'> {}
export interface HolidaysOutput extends Required<HolidaysInterface> {}

class Holidays
  extends Model<HolidaysInterface, HolidaysInput>
  implements HolidaysInterface
{
  public id!: number;
  public status_id!: number;
  public name!: string;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    Holidays.belongsTo(models.Statuses, {
      foreignKey: 'status_id',
      as: dbAliases.holidays.status,
    });
  }
}

Holidays.init(
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
    status_id: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      references: {
        model: 'statuses',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    underscored: true,
  },
);

export default Holidays;
