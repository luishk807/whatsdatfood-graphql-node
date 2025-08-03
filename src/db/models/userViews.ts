import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db';

interface UserViewsInterface {
  id: number;
  user_id: number;
  restaurant_id: number;
  user_search_type_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface UserViewsInput extends Optional<UserViewsInterface, 'id'> {}
export interface UserViewsOutput extends Required<UserViewsInterface> {}

class UserViews
  extends Model<UserViewsInterface, UserViewsInput>
  implements UserViewsInterface
{
  public id!: number;
  public user_id!: number;
  public user_search_type_id!: number;
  public restaurant_id!: number;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    UserViews.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: dbAliases.userViews.user,
    });
    UserViews.belongsTo(models.Restaurants, {
      foreignKey: 'restaurant_id',
      as: dbAliases.userViews.restaurant,
    });
  }
}

UserViews.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    user_search_type_id: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      references: {
        model: 'user_search_types',
        key: 'id',
      },
      onDelete: 'SET NULL',
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

export default UserViews;
