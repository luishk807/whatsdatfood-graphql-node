import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../sequelize';

interface RestaurantInterface {
  id: number;
  name: string;
  createdA?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface RestaurantsInput extends Optional<RestaurantInterface, 'id'> {}
export interface RestaurantsOutput extends Required<RestaurantInterface> {}

class Restaurants
  extends Model<RestaurantInterface, RestaurantsInput>
  implements RestaurantInterface
{
  public id!: number;
  public name!: string;

  // timestamps!
  public readonly createAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
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
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    underscored: true,
  },
);

export default Restaurants;
