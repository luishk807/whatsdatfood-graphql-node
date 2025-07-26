import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db/index';

interface RestaurantInterface {
  id: number;
  name: string;
  slug?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  payment_method?: string;
  rating?: number;
  michelin_score?: number;
  description?: string;
  delivery_method?: string;
  letter_grade?: string;
  postal_code?: string;
  email?: string;
  reservation_required?: boolean;
  reservation_available?: boolean;
  website?: string;
  tasting_menu_only?: boolean;
  tasting_menu_price?: number;
  price_range?: string;
  drink_pairing_price?: number;
  parking_available?: boolean;
  cash_only?: boolean;
  card_payment?: boolean;
  drive_through?: boolean;
  delivery_option?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface RestaurantsInput
  extends Optional<RestaurantInterface, 'id' | 'slug'> {}
export interface RestaurantsOutput extends Required<RestaurantInterface> {}

class Restaurants
  extends Model<RestaurantInterface, RestaurantsInput>
  implements RestaurantInterface
{
  public id!: number;
  public slug!: string;
  public name!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public postal_code!: string;
  public phone!: string;
  public payment_method!: string;
  public rating!: number;
  public michelin_score!: number;
  public description!: string;
  public delivery_method!: string;
  public letter_grade!: string;
  public email!: string;
  public reservation_required!: boolean;
  public reservation_available!: boolean;
  public website!: string;
  public tasting_menu_only!: boolean;
  public tasting_menu_price!: number;
  public price_range!: string;
  public drink_pairing_price!: number;
  public parking_available!: boolean;
  public cash_only!: boolean;
  public card_payment!: boolean;
  public drive_through!: boolean;
  public delivery_option!: boolean;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    Restaurants.hasMany(models.RestaurantMenuItems, {
      foreignKey: 'restaurant_id',
      as: dbAliases.restaurant.restaurantItems,
    });
    Restaurants.hasMany(models.RestaurantBusinessHours, {
      foreignKey: 'restaurant_id',
      as: dbAliases.restaurant.restaurantBusinessHours,
    });
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
    phone: {
      type: DataTypes.STRING,
    },
    payment_method: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.DOUBLE,
    },
    michelin_score: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    delivery_method: {
      type: DataTypes.TEXT,
    },
    letter_grade: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    reservation_required: {
      type: DataTypes.BOOLEAN,
    },
    reservation_available: {
      type: DataTypes.BOOLEAN,
    },
    website: {
      type: DataTypes.STRING,
    },
    tasting_menu_only: {
      type: DataTypes.BOOLEAN,
    },
    tasting_menu_price: {
      type: DataTypes.DOUBLE,
    },
    price_range: {
      type: DataTypes.STRING,
    },
    drink_pairing_price: {
      type: DataTypes.DOUBLE,
    },
    parking_available: {
      type: DataTypes.DOUBLE,
    },
    cash_only: {
      type: DataTypes.BOOLEAN,
    },
    card_payment: {
      type: DataTypes.BOOLEAN,
    },
    drive_through: {
      type: DataTypes.BOOLEAN,
    },
    delivery_option: {
      type: DataTypes.BOOLEAN,
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
