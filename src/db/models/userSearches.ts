import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../sequelize';

interface UserSearchesInterface {
  id: number;
  user_id: string;
  restaurant_id: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface UserSearchesInput
  extends Optional<UserSearchesInterface, 'id'> {}
export interface UserSearchesOutput extends Required<UserSearchesInterface> {}

class UserSearches
  extends Model<UserSearchesInterface, UserSearchesInput>
  implements UserSearchesInterface
{
  public id!: number;
  public user_id!: string;
  public restaurant_id!: string;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    UserSearches.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'userSearchesUser',
    });
    UserSearches.belongsTo(models.Restaurants, {
      foreignKey: 'restaurant_id',
      as: 'userSearchesRestaurants',
    });
  }
}

UserSearches.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
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
    restaurant_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'restaurants',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    underscored: true,
  },
);

export default UserSearches;
