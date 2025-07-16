import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db/index';
interface UserRatingsInterface {
  id: number;
  rating: number;
  restaurant_menu_item_id: bigint;
  user_id: bigint;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface UserRatingsInput
  extends Optional<UserRatingsInterface, 'id'> {}
export interface UserRoleOutput extends Required<UserRatingsInterface> {}

class UserRatings
  extends Model<UserRatingsInterface, UserRatingsInput>
  implements UserRatingsInterface
{
  public id!: number;
  public rating!: number;
  public restaurant_menu_item_id!: bigint;
  public user_id!: bigint;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    UserRatings.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: dbAliases.userRatings.user,
    });
    UserRatings.belongsTo(models.RestaurantMenuItems, {
      foreignKey: 'restaurant_menu_item_id',
      as: dbAliases.userRatings.restaurantItem,
    });
  }
}

UserRatings.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    underscored: true,
  },
);

export default UserRatings;
