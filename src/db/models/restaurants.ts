import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../sequelize';

interface RestaurantInterface {
  id: number;
  name: string;
  slug?: Text;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface RestaurantsInput extends Optional<RestaurantInterface, 'id'> {}
export interface RestaurantsOutput extends Required<RestaurantInterface> {}

class Restaurants
  extends Model<RestaurantInterface, RestaurantsInput>
  implements RestaurantInterface
{
  public id!: number;
  public slug!: Text;
  public name!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public postal_code!: string;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    Restaurants.hasMany(models.RestaurantMenuItems);
  }
}

Restaurants.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    postal_code: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    underscored: true,
  },
);

export default Restaurants;
