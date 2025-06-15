import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../sequelize';

interface RestaurantsMenuItemsAttributes {
  id: number;
  restaurant_id: number;
  name: string;
  image: Text;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface RestaurantMenuInput
  extends Optional<RestaurantsMenuItemsAttributes, 'id'> {}

export interface RestaurantMenuOutput
  extends Required<RestaurantsMenuItemsAttributes> {}

class RestaurantMenuItems
  extends Model<RestaurantsMenuItemsAttributes, RestaurantMenuInput>
  implements RestaurantsMenuItemsAttributes
{
  public id!: number;
  public name!: string;
  public restaurant_id!: number;
  public image!: Text;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
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
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
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
