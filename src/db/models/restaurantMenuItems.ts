import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';

interface RestaurantsMenuItemsAttributes {
  id: bigint;
  restaurant_id: bigint;
  name: string;
  description?: Text;
  category?: string;
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
  public id!: bigint;
  public name!: string;
  public restaurant_id!: bigint;
  public category!: string;
  public description!: Text;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
  static associate(models: any): void {
    RestaurantMenuItems.belongsTo(models.Restaurants, {
      foreignKey: 'restaurant_id',
      as: 'restaurantMenuItemsRestaurant',
    });
  }
}

RestaurantMenuItems.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    restaurant_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'restaurants',
        key: 'id',
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
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
