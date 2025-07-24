import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db/index';
interface RestaurantHolidaysInterface {
  id: number;
  restaurant_id: number;
  holiday_id: number;
  status_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface RestaurantHolidaysInput
  extends Optional<RestaurantHolidaysInterface, 'id'> {}
export interface RestaurantHolidaysOutput
  extends Required<RestaurantHolidaysInterface> {}

class RestaurantHolidays
  extends Model<RestaurantHolidaysInterface, RestaurantHolidaysInput>
  implements RestaurantHolidaysInterface
{
  public id!: number;
  public restaurant_id!: number;
  public holiday_id!: number;
  public status_id!: number;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    RestaurantHolidays.belongsTo(models.Holidays, {
      foreignKey: 'holiday_id',
      as: dbAliases.restaurantHoliday.holiday,
    });
    RestaurantHolidays.belongsTo(models.Restaurants, {
      foreignKey: 'restaurant_id',
      as: dbAliases.restaurantHoliday.restaurant,
    });
    RestaurantHolidays.belongsTo(models.Statuses, {
      foreignKey: 'status_id',
      as: dbAliases.restaurantHoliday.status,
    });
  }
}

RestaurantHolidays.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    restaurant_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'restaurants',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    holiday_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'holidays',
        key: 'id',
      },
      onDelete: 'CASCADE',
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

export default RestaurantHolidays;
