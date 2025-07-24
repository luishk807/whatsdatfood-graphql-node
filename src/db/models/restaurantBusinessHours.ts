import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db/index';
interface RestaurantBusinessHoursInterface {
  id: number;
  day_of_week: string;
  open_time: string;
  closing_time: string;
  restaurant_id: number;
  status_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface RestaurantBusinessHoursInput
  extends Optional<RestaurantBusinessHoursInterface, 'id'> {}
export interface RestaurantBusinessHoursOutput
  extends Required<RestaurantBusinessHoursInterface> {}

class RestaurantBusinessHours
  extends Model<RestaurantBusinessHoursInterface, RestaurantBusinessHoursInput>
  implements RestaurantBusinessHoursInterface
{
  public id!: number;
  public day_of_week!: string;
  public open_time!: string;
  public closing_time!: string;
  public restaurant_id!: number;
  public status_id!: number;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    RestaurantBusinessHours.belongsTo(models.Restaurants, {
      foreignKey: 'restaurant_id',
      as: dbAliases.restaurantBusinessHours.restaurant,
    });
    RestaurantBusinessHours.belongsTo(models.Statuses, {
      foreignKey: 'status_id',
      as: dbAliases.restaurantBusinessHours.status,
    });
  }
}

RestaurantBusinessHours.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    day_of_week: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    open_time: {
      allowNull: false,
      type: DataTypes.TIME,
      validate: {
        is: /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/,
      },
    },
    closing_time: {
      allowNull: false,
      type: DataTypes.TIME,
      validate: {
        is: /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/,
      },
    },
    restaurant_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'restaurants',
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

export default RestaurantBusinessHours;
