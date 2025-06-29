import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';

interface UserInterface {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  email: string;
  role: number;
  verification?: string;
  dob: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface UserInput extends Optional<UserInterface, 'id' | 'role'> {}
export interface UserOutput extends Required<UserInterface> {}

class Users extends Model<UserInterface, UserInput> implements UserInterface {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public password!: string;
  public phone!: string;
  public role!: number;
  public email!: string;
  public verification!: string;
  public dob!: Date;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    Users.hasMany(models.UserSearches);
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
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 1,
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
