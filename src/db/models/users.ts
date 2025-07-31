import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { UserRole } from 'enum';
import { dbAliases } from 'db/index';
interface UserInterface {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  phone: string;
  email: string;
  role_id: bigint;
  verification?: string;
  dob: Date;
  status_id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface UserInput extends Optional<UserInterface, 'id'> {}
export interface UserOutput extends Required<UserInterface> {}

class Users extends Model<UserInterface, UserInput> implements UserInterface {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public username!: string;
  public password!: string;
  public phone!: string;
  public status_id!: number;
  public role_id!: bigint;
  public email!: string;
  public verification!: string;
  public dob!: Date;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    Users.hasMany(models.UserSearches, {
      as: dbAliases.users.userSearches,
    });
    Users.hasMany(models.UserRatings, {
      as: dbAliases.users.userRatings,
    });
    Users.belongsTo(models.UserRoles, {
      foreignKey: 'role_id',
      as: dbAliases.users.userRole,
    });
    Users.belongsTo(models.Statuses, {
      foreignKey: 'status_id',
      as: dbAliases.users.status,
    });
    Users.hasMany(models.UserFavorites, {
      foreignKey: 'user_id',
      as: dbAliases.users.userFavorites,
    });
    Users.hasMany(models.UserFriends, {
      foreignKey: 'user_id',
      as: dbAliases.users.friends,
    });
  }
}

Users.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: UserRole.USER,
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
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    verification: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    underscored: true,
  },
);

export default Users;
