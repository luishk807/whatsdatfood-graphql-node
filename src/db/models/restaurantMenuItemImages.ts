import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db';

interface RestaurantsMenuItemImagesAttributes {
  id: bigint;
  restaurant_menu_item_id?: bigint;
  user_id?: bigint;
  name?: string;
  url_m?: string;
  url_s?: string;
  owner?: string;
  license?: string;
  content_link?: string;
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
  public user_id!: bigint;
  public name!: string;
  public url_m!: string;
  public url_s!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
  static associate(models: any): void {
    RestaurantMenuItemImages.belongsTo(models.RestaurantMenuItems, {
      foreignKey: 'restaurant_menu_item_id',
      as: dbAliases.restaurantItemImages.restaurantItem,
    });
    RestaurantMenuItemImages.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: dbAliases.restaurantItemImages.user,
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
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
    },
    license: {
      type: DataTypes.STRING,
    },
    content_link: {
      type: DataTypes.STRING,
    },
    url_m: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url_s: {
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

export default RestaurantMenuItemImages;
