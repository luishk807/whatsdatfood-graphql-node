import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../sequelize';

interface RestaurantsMenuItemsAttributes {
  id: number;
  restaurant_id: number;
  name: string;
  image: Text;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface RestaurantMenuItemsInput
  extends Optional<RestaurantsMenuItemsAttributes, 'id'> {}

export interface RestaurantMenuItemsOutput
  extends Required<RestaurantsMenuItemsAttributes> {}

class RestaurantMenuItems
  extends Model<RestaurantsMenuItemsAttributes, RestaurantMenuItemsInput>
  implements RestaurantsMenuItemsAttributes
{
  public id!: number;
  public name!: string;
  public restaurant_id!: number;
  public image!: Text;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
  static associate(models: any): void {
    RestaurantMenuItems.belongsTo(models.Restaurants, {
      foreignKey: 'restaurant_id',
      as: 'RestaurantMenuItemsRestaurant',
    });
  }
}

RestaurantMenuItems.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    restaurant_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'restaurants',
        key: 'id',
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.TEXT,
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
    paranoid: true,
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: true,
  },
);

export default RestaurantMenuItems;
