import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db/index';
interface UserFavoritesInterface {
  id: number;
  user_id: number;
  restaurant_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface UserFavoritesInput
  extends Optional<UserFavoritesInterface, 'id'> {}
export interface UserFavoritesOutput extends Required<UserFavoritesInterface> {}

class UserFavorites
  extends Model<UserFavoritesInterface, UserFavoritesInput>
  implements UserFavoritesInterface
{
  public id!: number;
  public user_id!: number;
  public restaurant_id!: number;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    UserFavorites.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: dbAliases.userFavorites.user,
    });
    UserFavorites.belongsTo(models.Restaurants, {
      foreignKey: 'restaurant_id',
      as: dbAliases.userFavorites.restaurant,
    });
  }
}

UserFavorites.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    restaurant_id: {
      allowNull: false,
      type: DataTypes.BIGINT,

      references: {
        model: 'restaurants',
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

export default UserFavorites;
