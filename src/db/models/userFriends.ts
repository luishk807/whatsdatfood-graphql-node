import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db/index';
interface UserFriendsInterface {
  id: number;
  user_id: bigint;
  name: string;
  email?: string;
  phone?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface UserFriendsInput
  extends Optional<UserFriendsInterface, 'id'> {}
export interface UserFriendsOutput extends Required<UserFriendsInterface> {}

class UserFriends
  extends Model<UserFriendsInterface, UserFriendsInput>
  implements UserFriendsInterface
{
  public id!: number;
  public user_id!: bigint;
  public name!: string;
  public phone!: string;
  public email!: string;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    UserFriends.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: dbAliases.userFriends.user,
    });
  }
}

UserFriends.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    underscored: true,
  },
);

export default UserFriends;
