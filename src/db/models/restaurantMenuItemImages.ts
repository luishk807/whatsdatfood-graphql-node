import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../sequelize';

interface RestaurantsMenuItemImagesAttributes {
  id: bigint;
  restaurant_menu_item_id?: bigint;
  name?: Text;
  url?: Text;
  category?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface RestaurantMenuItemImagesInput
  extends Optional<RestaurantsMenuItemImagesAttributes, 'id'> {}

export interface RestaurantMenuItemsOutput
  extends Required<RestaurantsMenuItemImagesAttributes> {}

class RestaurantMenuItemImages
  extends Model<
    RestaurantsMenuItemImagesAttributes,
    RestaurantMenuItemImagesInput
  >
  implements RestaurantsMenuItemImagesAttributes
{
  public id!: bigint;
  public restaurantMenuItemId!: bigint;
  public name!: Text;
  public url!: Text;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
  static associate(models: any): void {
    RestaurantMenuItemImages.belongsTo(models.RestaurantMenuItems, {
      foreignKey: 'restaurant_menu_item_id',
      as: 'restaurantMenuItemImagesRestaurant',
    });
  }
}

RestaurantMenuItemImages.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    restaurant_menu_item_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'restaurant_menu_items',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
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
    paranoid: true,
    timestamps: true,
    sequelize: sequelizeConnection,
    underscored: true,
  },
);

export default RestaurantMenuItemImages;
