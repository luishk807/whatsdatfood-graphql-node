import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db/index';
interface RestaurantCategoriesInterface {
  id: number;
  status_id: number;
  food_category_id: number;
  restaurant_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface RestaurantCategoriesInput
  extends Optional<RestaurantCategoriesInterface, 'id'> {}
export interface RestaurantCategoriesOutput
  extends Required<RestaurantCategoriesInterface> {}

class RestaurantCategories
  extends Model<RestaurantCategoriesInterface, RestaurantCategoriesInput>
  implements RestaurantCategoriesInterface
{
  public id!: number;
  public food_category_id!: number;
  public restaurant_id!: number;
  public status_id!: number;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    RestaurantCategories.belongsTo(models.Restaurants, {
      foreignKey: 'restaurant_id',
      as: dbAliases.restaurantCategories.restaurant,
    });
    RestaurantCategories.belongsTo(models.FoodCategories, {
      foreignKey: 'food_category_id',
      as: dbAliases.restaurantCategories.foodCategory,
    });
    RestaurantCategories.belongsTo(models.Statuses, {
      foreignKey: 'status_id',
      as: dbAliases.restaurantCategories.status,
    });
  }
}

RestaurantCategories.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    food_category_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'food_categories',
        key: 'id',
      },
      onDelete: 'CASCADE',
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

export default RestaurantCategories;
